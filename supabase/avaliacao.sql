-- Questionários de avaliação do casal (IBCT)
-- Rode este arquivo uma vez em: Supabase > SQL Editor > New query > Run.

create table if not exists public.avaliacoes (
  id             uuid primary key default gen_random_uuid(),
  criado_em      timestamptz not null default now(),
  casal          text not null check (char_length(casal) between 1 and 40),
  parceiro       text not null check (char_length(parceiro) between 1 and 80),
  idioma         text not null default 'pt' check (idioma in ('pt','en')),
  versao         int  not null default 1,
  consentimento  boolean not null check (consentimento = true),
  respostas      jsonb not null check (pg_column_size(respostas) < 200000),
  lido           boolean not null default false
);

create index if not exists avaliacoes_casal_idx on public.avaliacoes (casal, criado_em desc);

alter table public.avaliacoes enable row level security;

-- Qualquer pessoa com o link pode ENVIAR uma resposta, mas não pode ler, alterar ou apagar nada.
drop policy if exists "envio publico" on public.avaliacoes;
create policy "envio publico" on public.avaliacoes
  for insert to anon
  with check (consentimento = true and lido = false);

-- Só o terapeuta logado (e-mail abaixo) lê, marca como lida e apaga.
drop policy if exists "terapeuta le" on public.avaliacoes;
create policy "terapeuta le" on public.avaliacoes
  for select to authenticated
  using ((auth.jwt() ->> 'email') = 'psicologoafetivo@gmail.com');

drop policy if exists "terapeuta atualiza" on public.avaliacoes;
create policy "terapeuta atualiza" on public.avaliacoes
  for update to authenticated
  using ((auth.jwt() ->> 'email') = 'psicologoafetivo@gmail.com')
  with check ((auth.jwt() ->> 'email') = 'psicologoafetivo@gmail.com');

drop policy if exists "terapeuta apaga" on public.avaliacoes;
create policy "terapeuta apaga" on public.avaliacoes
  for delete to authenticated
  using ((auth.jwt() ->> 'email') = 'psicologoafetivo@gmail.com');

-- Permissões de coluna: o público só grava estas colunas.
revoke all on public.avaliacoes from anon;
grant insert (casal, parceiro, idioma, versao, consentimento, respostas) on public.avaliacoes to anon;
grant select, update (lido), delete on public.avaliacoes to authenticated;
