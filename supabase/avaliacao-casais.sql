-- Casais cadastrados no painel de avaliação (para os convites não sumirem da tela).
-- Rode uma vez em: Supabase > SQL Editor > New query > Run.
-- Só o terapeuta logado lê e grava. O formulário público não usa esta tabela.

create table if not exists public.avaliacao_casais (
  codigo     text primary key check (codigo ~ '^[a-z0-9-]{1,40}$'),
  criado_em  timestamptz not null default now(),
  parceiro1  text not null check (char_length(parceiro1) between 1 and 60),
  parceiro2  text not null check (char_length(parceiro2) between 1 and 60),
  idioma     text not null default 'pt' check (idioma in ('pt','en'))
);

alter table public.avaliacao_casais enable row level security;

drop policy if exists "terapeuta tudo" on public.avaliacao_casais;
create policy "terapeuta tudo" on public.avaliacao_casais
  for all to authenticated
  using ((auth.jwt() ->> 'email') = 'psicologoafetivo@gmail.com')
  with check ((auth.jwt() ->> 'email') = 'psicologoafetivo@gmail.com');

revoke all on public.avaliacao_casais from anon;
grant select, insert, update, delete on public.avaliacao_casais to authenticated;
