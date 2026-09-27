-- Estrutura inicial para conectar o app de clientes ao painel de funcionários.
-- Aplicar uma vez no SQL Editor do projeto Supabase correto.
-- Não inclui dados fictícios nem cria usuários de equipe automaticamente.

begin;

-- Mantém a migration executável mesmo quando o schema inicial ainda não foi aplicado.
create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  full_name text not null default '',
  created_at timestamptz not null default now()
);

create or replace function public.create_profile_for_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.profiles (id, full_name)
  values (new.id, coalesce(new.raw_user_meta_data ->> 'full_name', ''))
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created_profile on auth.users;
create trigger on_auth_user_created_profile
after insert on auth.users
for each row execute function public.create_profile_for_new_user();

create table if not exists public.staff_members (
  user_id uuid primary key references auth.users (id) on delete cascade,
  role text not null check (role in ('support', 'finance', 'admin')),
  active boolean not null default true,
  created_at timestamptz not null default now()
);

create or replace function public.staff_has_role(required_roles text[])
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1
    from public.staff_members as member
    where member.user_id = (select auth.uid())
      and member.active
      and member.role = any (required_roles)
  );
$$;

create table if not exists public.plans (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  description text not null default '',
  price_cents integer not null check (price_cents >= 0),
  billing_period text not null check (billing_period in ('monthly', 'semester', 'one_time')),
  benefits jsonb not null default '[]'::jsonb check (jsonb_typeof(benefits) = 'array'),
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.routes (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  origin text not null,
  destination text not null,
  description text not null default '',
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.subscriptions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete restrict,
  plan_id uuid not null references public.plans (id) on delete restrict,
  status text not null check (status in ('pending', 'active', 'past_due', 'cancelled', 'expired')),
  starts_at timestamptz,
  ends_at timestamptz,
  next_billing_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (ends_at is null or starts_at is null or ends_at >= starts_at)
);

create index if not exists subscriptions_user_created_idx
  on public.subscriptions (user_id, created_at desc);

create table if not exists public.payments (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete restrict,
  subscription_id uuid references public.subscriptions (id) on delete set null,
  amount_cents integer not null check (amount_cents >= 0),
  status text not null check (status in ('pending', 'paid', 'failed', 'refunded', 'cancelled')),
  due_at timestamptz,
  paid_at timestamptz,
  provider text,
  provider_reference text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists payments_user_created_idx
  on public.payments (user_id, created_at desc);
create index if not exists payments_status_due_idx
  on public.payments (status, due_at);

create table if not exists public.support_tickets (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete restrict,
  subject text not null,
  status text not null default 'open' check (status in ('open', 'in_progress', 'waiting_customer', 'closed')),
  assigned_to uuid references auth.users (id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists support_tickets_user_updated_idx
  on public.support_tickets (user_id, updated_at desc);
create index if not exists support_tickets_status_updated_idx
  on public.support_tickets (status, updated_at desc);

create table if not exists public.support_messages (
  id uuid primary key default gen_random_uuid(),
  ticket_id uuid not null references public.support_tickets (id) on delete cascade,
  author_id uuid not null references auth.users (id) on delete restrict,
  body text not null check (length(trim(body)) > 0),
  created_at timestamptz not null default now()
);

create index if not exists support_messages_ticket_created_idx
  on public.support_messages (ticket_id, created_at);

create table if not exists public.audit_log (
  id bigint generated always as identity primary key,
  actor_id uuid references auth.users (id) on delete set null,
  action text not null,
  entity text not null,
  entity_id uuid not null,
  before_data jsonb,
  after_data jsonb,
  created_at timestamptz not null default now()
);

create index if not exists audit_log_entity_created_idx
  on public.audit_log (entity, entity_id, created_at desc);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists plans_set_updated_at on public.plans;
create trigger plans_set_updated_at before update on public.plans
for each row execute function public.set_updated_at();
drop trigger if exists routes_set_updated_at on public.routes;
create trigger routes_set_updated_at before update on public.routes
for each row execute function public.set_updated_at();
drop trigger if exists subscriptions_set_updated_at on public.subscriptions;
create trigger subscriptions_set_updated_at before update on public.subscriptions
for each row execute function public.set_updated_at();
drop trigger if exists payments_set_updated_at on public.payments;
create trigger payments_set_updated_at before update on public.payments
for each row execute function public.set_updated_at();
drop trigger if exists support_tickets_set_updated_at on public.support_tickets;
create trigger support_tickets_set_updated_at before update on public.support_tickets
for each row execute function public.set_updated_at();

create or replace function public.log_admin_change()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
declare
  old_row jsonb;
  new_row jsonb;
  row_id uuid;
begin
  if tg_op <> 'INSERT' then old_row := to_jsonb(old); end if;
  if tg_op <> 'DELETE' then new_row := to_jsonb(new); end if;
  row_id := coalesce((new_row ->> 'id')::uuid, (old_row ->> 'id')::uuid);

  insert into public.audit_log (actor_id, action, entity, entity_id, before_data, after_data)
  values (auth.uid(), lower(tg_op), tg_table_name, row_id, old_row, new_row);

  if tg_op = 'DELETE' then return old; end if;
  return new;
end;
$$;

drop trigger if exists plans_audit_change on public.plans;
create trigger plans_audit_change after insert or update or delete on public.plans
for each row execute function public.log_admin_change();
drop trigger if exists routes_audit_change on public.routes;
create trigger routes_audit_change after insert or update or delete on public.routes
for each row execute function public.log_admin_change();
drop trigger if exists subscriptions_audit_change on public.subscriptions;
create trigger subscriptions_audit_change after insert or update or delete on public.subscriptions
for each row execute function public.log_admin_change();
drop trigger if exists payments_audit_change on public.payments;
create trigger payments_audit_change after insert or update or delete on public.payments
for each row execute function public.log_admin_change();

alter table public.staff_members enable row level security;
alter table public.plans enable row level security;
alter table public.routes enable row level security;
alter table public.subscriptions enable row level security;
alter table public.payments enable row level security;
alter table public.support_tickets enable row level security;
alter table public.support_messages enable row level security;
alter table public.audit_log enable row level security;
alter table public.profiles enable row level security;

drop policy if exists "Usuários podem ver o próprio perfil" on public.profiles;
create policy "Usuários podem ver o próprio perfil" on public.profiles
for select to authenticated
using ((select auth.uid()) = id);
drop policy if exists "Usuários podem atualizar o próprio perfil" on public.profiles;
create policy "Usuários podem atualizar o próprio perfil" on public.profiles
for update to authenticated
using ((select auth.uid()) = id)
with check ((select auth.uid()) = id);

drop policy if exists "Membro vê sua própria função" on public.staff_members;
create policy "Membro vê sua própria função" on public.staff_members
for select to authenticated
using (user_id = (select auth.uid()) or public.staff_has_role(array['admin']::text[]));

drop policy if exists "Clientes veem planos ativos" on public.plans;
create policy "Clientes veem planos ativos" on public.plans
for select to authenticated
using (active or public.staff_has_role(array['admin']::text[]));
drop policy if exists "Administradores gerenciam planos" on public.plans;
create policy "Administradores gerenciam planos" on public.plans
for all to authenticated
using (public.staff_has_role(array['admin']::text[]))
with check (public.staff_has_role(array['admin']::text[]));

drop policy if exists "Clientes veem rotas ativas" on public.routes;
create policy "Clientes veem rotas ativas" on public.routes
for select to authenticated
using (active or public.staff_has_role(array['admin']::text[]));
drop policy if exists "Administradores gerenciam rotas" on public.routes;
create policy "Administradores gerenciam rotas" on public.routes
for all to authenticated
using (public.staff_has_role(array['admin']::text[]))
with check (public.staff_has_role(array['admin']::text[]));

drop policy if exists "Cliente e equipe consultam assinaturas permitidas" on public.subscriptions;
create policy "Cliente e equipe consultam assinaturas permitidas" on public.subscriptions
for select to authenticated
using (
  user_id = (select auth.uid())
  or public.staff_has_role(array['support', 'finance', 'admin']::text[])
);

drop policy if exists "Cliente e equipe consultam pagamentos permitidos" on public.payments;
create policy "Cliente e equipe consultam pagamentos permitidos" on public.payments
for select to authenticated
using (
  user_id = (select auth.uid())
  or public.staff_has_role(array['support', 'finance', 'admin']::text[])
);

drop policy if exists "Cliente cria chamado próprio" on public.support_tickets;
create policy "Cliente cria chamado próprio" on public.support_tickets
for insert to authenticated
with check (
  user_id = (select auth.uid())
  and status = 'open'
  and assigned_to is null
);
drop policy if exists "Cliente e suporte consultam chamados permitidos" on public.support_tickets;
create policy "Cliente e suporte consultam chamados permitidos" on public.support_tickets
for select to authenticated
using (
  user_id = (select auth.uid())
  or public.staff_has_role(array['support', 'admin']::text[])
);
drop policy if exists "Suporte gerencia chamados" on public.support_tickets;
create policy "Suporte gerencia chamados" on public.support_tickets
for update to authenticated
using (public.staff_has_role(array['support', 'admin']::text[]))
with check (public.staff_has_role(array['support', 'admin']::text[]));

drop policy if exists "Participantes consultam mensagens do chamado" on public.support_messages;
create policy "Participantes consultam mensagens do chamado" on public.support_messages
for select to authenticated
using (
  exists (
    select 1 from public.support_tickets as ticket
    where ticket.id = ticket_id
      and (
        ticket.user_id = (select auth.uid())
        or public.staff_has_role(array['support', 'admin']::text[])
      )
  )
);
drop policy if exists "Cliente envia mensagem no próprio chamado" on public.support_messages;
create policy "Cliente envia mensagem no próprio chamado" on public.support_messages
for insert to authenticated
with check (
  author_id = (select auth.uid())
  and exists (
    select 1 from public.support_tickets as ticket
    where ticket.id = ticket_id
      and ticket.user_id = (select auth.uid())
      and ticket.status <> 'closed'
  )
);
drop policy if exists "Suporte responde chamados" on public.support_messages;
create policy "Suporte responde chamados" on public.support_messages
for insert to authenticated
with check (
  author_id = (select auth.uid())
  and public.staff_has_role(array['support', 'admin']::text[])
  and exists (
    select 1 from public.support_tickets as ticket
    where ticket.id = ticket_id
  )
);

drop policy if exists "Administradores consultam auditoria" on public.audit_log;
create policy "Administradores consultam auditoria" on public.audit_log
for select to authenticated
using (public.staff_has_role(array['admin']::text[]));

drop policy if exists "Equipe consulta perfis para atendimento" on public.profiles;
create policy "Equipe consulta perfis para atendimento" on public.profiles
for select to authenticated
using (public.staff_has_role(array['support', 'finance', 'admin']::text[]));

commit;
