# Integração do app de clientes com o painel de funcionários

Este documento descreve como evoluir o app Transporte para que clientes usem o app móvel e funcionários usem um painel web, com dados compartilhados e acesso separado.

## Arquitetura sugerida

- **App de clientes:** projeto Expo/React Native atual, publicado para Android/iOS.
- **Painel de funcionários:** aplicação web separada, com endereço próprio e login de equipe.
- **Backend compartilhado:** o mesmo projeto Supabase para autenticação, banco de dados e atualizações em tempo real, se necessário.
- **Código independente, dados compartilhados:** cada interface tem seu próprio ciclo de publicação; ambas consultam a mesma API/banco com permissões adequadas.

Separar os projetos facilita publicar o site sem atualizar o app e reduz o risco de misturar telas internas com a experiência do cliente. O painel pode ser criado em outro repositório. Se futuramente for conveniente, os dois projetos também podem ficar em um monorepo, mantendo aplicações e configurações separadas.

## Estado atual do repositório

- Expo SDK 57 com Expo Router; rotas em `src/app` e telas reutilizadas em `src/screens`.
- Login e cadastro usam Supabase Auth. No cadastro, o nome completo é salvo como `user_metadata.full_name`.
- `src/lib/supabase.ts` cria o cliente usando `EXPO_PUBLIC_SUPABASE_URL` e `EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY`.
- `supabase/schema.sql` cria `profiles`, ligado a `auth.users`, e uma tabela de exemplo `user_records`. RLS está ligada; as políticas atuais deixam cada cliente ler/alterar seu perfil e acessar apenas os próprios registros.
- Nome e QR do passe usam a sessão autenticada. O QR atual é um identificador derivado do ID Supabase do usuário; ainda não há um serviço de validação de embarque associado a ele.
- As telas `PlanosScreen` e a seção Planos da Home consultam `public.plans` e mostram planos ativos, preços em centavos, descrição e benefícios. Os botões ainda não realizam compra. Contagem de viagens e status do passe na Home/Perfil ainda são dados de demonstração; assinaturas ainda não são carregadas no app.
- A tela de suporte oferece interface/canais, mas não há armazenamento de chamados e mensagens no banco identificado no código atual.
- Não há tabelas atuais para funcionários, linhas/rotas, planos, assinaturas, pagamentos, chamados ou trilha de auditoria.

## Dados que devem passar para o backend

O painel só consegue mudar o que o app busca do backend. Substitua gradualmente os dados de demonstração por tabelas como:

| Entidade | Campos principais sugeridos | Uso |
| --- | --- | --- |
| `profiles` | `id`, `full_name`, `created_at` | Cadastro do cliente (já existe; pode ser estendido com cuidado). |
| `plans` | `id`, `name`, `description`, `price_cents`, `billing_period`, `benefits`, `active`, `updated_at` | Catálogo de planos e preços. Valores monetários em centavos inteiros. |
| `routes` | `id`, `name`, `origin`, `destination`, `active`, `updated_at` | Linhas/rotas disponíveis no app. |
| `subscriptions` | `id`, `user_id`, `plan_id`, `status`, `starts_at`, `ends_at` | Plano contratado por cliente. |
| `payments` | `id`, `user_id`, `subscription_id`, `amount_cents`, `status`, `due_at`, `paid_at`, `provider_reference` | Histórico e pagamentos pendentes. Não armazenar dados de cartão. |
| `support_tickets` | `id`, `user_id`, `subject`, `status`, `assigned_to`, `created_at`, `updated_at` | Fila de atendimento. |
| `support_messages` | `id`, `ticket_id`, `author_id`, `body`, `created_at` | Conversa do cliente e da equipe. |
| `audit_log` | `id`, `actor_id`, `action`, `entity`, `entity_id`, `before`, `after`, `created_at` | Registro de alterações administrativas. |

Os campos são um ponto de partida, não um esquema pronto para executar. Defina regras de negócio, estados válidos, índices, exclusão/retensão e políticas antes de criar as migrations.

## Migration inicial preparada

O repositório agora contém `supabase/migrations/20260927000000_operacao_painel.sql`. Ela cria as tabelas de planos, rotas, assinaturas, pagamentos, chamados, mensagens, equipe e auditoria; ativa RLS e adiciona as políticas iniciais descritas acima. Valores de preço são armazenados em centavos inteiros.

Para aplicá-la, abra o SQL Editor do projeto Supabase correto, revise o arquivo e execute seu conteúdo. Ela também garante a existência de `profiles` e do gatilho de criação de perfil, então não depende de executar `supabase/schema.sql` antes. O arquivo `schema.sql` continua disponível para a tabela de exemplo `user_records`. A execução no banco Supabase ainda precisa ser feita pelo responsável pelo projeto; criar o arquivo no repositório não altera o banco remoto.

Depois, crie ou convide uma conta de funcionário pelo Supabase Auth. A atribuição de função deve ser feita por uma pessoa administradora no SQL Editor, substituindo o e-mail pelo da conta criada:

```sql
insert into public.staff_members (user_id, role)
select id, 'admin'
from auth.users
where email = 'admin@seudominio.com'
on conflict (user_id) do update
set role = excluded.role, active = true;
```

Faça esse primeiro cadastro apenas para uma pessoa confiável. As funções aceitas são `admin`, `support` e `finance`; usuários comuns não têm política para inserir ou alterar sua própria função. O painel e o app ainda precisam ser conectados às tabelas, e os pagamentos ainda precisam de integração segura com um provedor.

## Acesso e segurança

1. Clientes e funcionários podem usar Supabase Auth, mas a função de funcionário deve ser atribuída apenas por um fluxo administrativo confiável. Não use `user_metadata` editável pelo próprio usuário para conceder privilégios.
2. Guarde a função em `app_metadata` ou em uma tabela de equipe protegida, e valide-a também no servidor/banco.
3. Ative RLS em todas as tabelas. Clientes devem acessar apenas seu perfil, suas assinaturas, pagamentos e chamados. Funcionários recebem políticas específicas conforme a função (por exemplo, suporte, financeiro ou administrador).
4. A chave `service_role` nunca pode entrar no app ou no navegador. Ela ignora RLS. As interfaces usam a chave publicável; operações privilegiadas devem passar por políticas e, quando necessário, Edge Functions/servidor.
5. Restringir as ações administrativas: por exemplo, suporte pode responder chamados, financeiro pode consultar pagamentos, e só administradores podem alterar preços e ativar/desativar planos ou rotas.
6. Registrar alterações sensíveis em `audit_log`, incluindo autor, horário e valores anteriores/novos. Evitar registrar senhas, tokens ou dados completos de cartão.
7. Pagamentos reais devem ser confirmados por integração segura com o provedor (webhook verificado no servidor), nunca apenas por uma ação no painel.

## Como as mudanças chegam ao app

- **Planos, preços e linhas:** o app consulta registros ativos no Supabase ao abrir a tela (e pode atualizar ao voltar para ela). Alterar os registros no painel atualiza os dados mostrados na próxima consulta, sem republicar o app.
- **Atualização quase imediata:** Supabase Realtime pode notificar o app sobre alterações nas tabelas apropriadas; a tela então recarrega os dados. Isso é opcional e deve ser habilitado somente onde fizer sentido.
- **Suporte:** cliente e funcionário leem/escrevem mensagens autorizadas no mesmo chamado; Realtime pode atualizar a conversa.
- **Pagamentos:** o painel lê status persistidos pelo backend/provedor. O painel não deve marcar um pagamento como pago apenas por edição manual sem fluxo auditado.
- **Novas funções visuais ou mudanças no código:** ainda exigem uma nova publicação do app (ou um fluxo de atualização compatível do Expo). Dados alterados no banco não criam telas novas.

## Sequência de implementação

1. **Definir operação:** listar funções da equipe e o que cada uma pode fazer; definir estados e regras de planos, linhas, pagamentos e chamados.
2. **Modelar banco:** preparar migrations SQL para as novas tabelas, constraints, índices, RLS e políticas. Revisar as políticas com contas de cliente e equipe diferentes.
3. **Preparar usuários da equipe:** implementar atribuição administrativa de funções; criar pelo menos uma conta de cada função para validação.
4. **Construir o painel:** autenticação, navegação restrita e telas iniciais. Começar por planos/rotas e suporte; adicionar financeiro quando o provedor de pagamento estiver integrado.
5. **Conectar o app:** substituir valores fixos de Planos/Home/Perfil por consultas ao Supabase; mostrar estado de carregamento, erro e ausência de dados.
6. **Adicionar histórico e auditoria:** toda mudança de preço, plano, rota, pagamento manual ou chamado deve guardar autor e data.
7. **Publicar por partes:** publicar primeiro o painel protegido; migrar telas do app depois. O painel pode ser atualizado de forma independente do app.

## Checklist antes de colocar em produção

- [ ] Nenhum segredo `service_role` incluído em bundle web ou app.
- [ ] RLS habilitada e testada com cliente A, cliente B e funcionários de diferentes funções.
- [ ] Cliente A não consegue consultar ou alterar dados do cliente B.
- [ ] Usuário comum não consegue conceder a si mesmo função de funcionário.
- [ ] Mudanças administrativas críticas geram histórico auditável.
- [ ] Preços e estados são validados no servidor/banco, não apenas na interface.
- [ ] Pagamento só muda para confirmado após confirmação confiável do provedor.
- [ ] App trata falha de rede e não apresenta dados desatualizados como confirmação de pagamento.
- [ ] Políticas de privacidade, retenção e suporte estão definidas para os dados pessoais.

## Referências no projeto

- Autenticação: `src/app/login.tsx`, `src/contexts/AuthContext.tsx`
- Cliente Supabase: `src/lib/supabase.ts`
- Esquema inicial: `supabase/schema.sql`
- Home: `src/screens/HomeScreen.tsx`
- Planos: `src/screens/PlanosScreen.tsx`
- Suporte: `src/screens/SuporteScreen.tsx`, `src/app/chat.tsx`
- Perfil: `src/screens/PerfilScreen.tsx`
