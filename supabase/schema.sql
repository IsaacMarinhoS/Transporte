-- Execute este arquivo no SQL Editor do seu projeto Supabase.
create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  full_name text not null default '',
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

create policy "Usuários podem ver o próprio perfil"
  on public.profiles for select
  to authenticated
  using ((select auth.uid()) = id);

create policy "Usuários podem atualizar o próprio perfil"
  on public.profiles for update
  to authenticated
  using ((select auth.uid()) = id)
  with check ((select auth.uid()) = id);

create or replace function public.create_profile_for_new_user()
returns trigger
language plpgsql
security definer set search_path = ''
as $$
begin
  insert into public.profiles (id, full_name)
  values (new.id, coalesce(new.raw_user_meta_data ->> 'full_name', ''));
  return new;
end;
$$;

drop trigger if exists on_auth_user_created_profile on auth.users;
create trigger on_auth_user_created_profile
  after insert on auth.users
  for each row execute procedure public.create_profile_for_new_user();

-- Exemplo de armazenamento para dados que o app adicionar no futuro.
-- Cada registro pertence ao usuário que o criou e as políticas bloqueiam acesso cruzado.
create table if not exists public.user_records (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid() references auth.users (id) on delete cascade,
  data jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

alter table public.user_records enable row level security;

create policy "Usuários acessam apenas seus registros"
  on public.user_records for all
  to authenticated
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);
