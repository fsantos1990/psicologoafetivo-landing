-- Decodificando o Amor · app interativo
-- Banco no Supabase (Postgres). Rodar inteiro no SQL Editor de um projeto novo.
-- Regras principais:
--   1. Só entra no app quem tem acesso liberado (tabela entitlements, alimentada pela Hotmart hoje e pelo seu checkout no futuro).
--   2. O casal compartilha o plano; cada pessoa só vê as notas do parceiro depois de completar as próprias (o livro pede notas sem olhar as do outro).
--   3. Exercícios individuais (ex.: mapa de contexto do desejo) só a própria pessoa vê.
--   4. Leads do quiz entram por inserção anônima, com consentimento registrado (LGPD), e ninguém lê pela API pública.

create extension if not exists pgcrypto;

-- ---------- acesso ----------
create table public.entitlements (
  email       text primary key check (email = lower(email)),
  product     text not null default 'decodificando-o-amor',
  source      text not null default 'hotmart',          -- 'hotmart', 'manual', 'checkout-proprio'
  external_id text,                                      -- código da transação na plataforma de venda
  active      boolean not null default true,             -- false em reembolso ou chargeback
  created_at  timestamptz not null default now()
);
alter table public.entitlements enable row level security;
-- sem políticas: só a service role (webhook) lê e escreve

create or replace function public.has_access() returns boolean
language sql stable security definer set search_path = public as $$
  select exists (
    select 1 from entitlements
    where email = lower(auth.jwt() ->> 'email') and active
  );
$$;

-- ---------- casal ----------
create table public.couples (
  id          uuid primary key default gen_random_uuid(),
  invite_code text unique not null default upper(substr(encode(gen_random_bytes(6),'hex'),1,8)),
  start_date  date,
  created_at  timestamptz not null default now()
);

create table public.couple_members (
  couple_id uuid not null references public.couples(id) on delete cascade,
  user_id   uuid not null references auth.users(id) on delete cascade,
  joined_at timestamptz not null default now(),
  primary key (couple_id, user_id),
  unique (user_id)                                        -- uma pessoa, um casal
);

create or replace function public.my_couple() returns uuid
language sql stable security definer set search_path = public as $$
  select couple_id from couple_members where user_id = auth.uid();
$$;

create or replace function public.partner_id() returns uuid
language sql stable security definer set search_path = public as $$
  select m.user_id from couple_members m
  where m.couple_id = my_couple() and m.user_id <> auth.uid();
$$;

-- criar casal e entrar por código (RPC chamadas pelo app)
create or replace function public.create_couple() returns public.couples
language plpgsql security definer set search_path = public as $$
declare c couples;
begin
  if not has_access() then raise exception 'Sem acesso liberado para este e-mail'; end if;
  if my_couple() is not null then raise exception 'Você já faz parte de um casal'; end if;
  insert into couples default values returning * into c;
  insert into couple_members (couple_id, user_id) values (c.id, auth.uid());
  return c;
end $$;

create or replace function public.join_couple(code text) returns public.couples
language plpgsql security definer set search_path = public as $$
declare c couples; n int;
begin
  if my_couple() is not null then raise exception 'Você já faz parte de um casal'; end if;
  select * into c from couples where invite_code = upper(trim(code));
  if c.id is null then raise exception 'Código não encontrado'; end if;
  select count(*) into n from couple_members where couple_id = c.id;
  if n >= 2 then raise exception 'Este casal já tem duas pessoas'; end if;
  -- o parceiro entra pelo convite de quem comprou, sem precisar de compra própria
  insert into couple_members (couple_id, user_id) values (c.id, auth.uid());
  return c;
end $$;

alter table public.couples enable row level security;
alter table public.couple_members enable row level security;
create policy "ver meu casal" on public.couples for select using (id = my_couple());
create policy "editar data de início" on public.couples for update using (id = my_couple()) with check (id = my_couple());
create policy "ver membros do meu casal" on public.couple_members for select using (couple_id = my_couple());

-- ---------- plano de 30 dias (compartilhado pelo casal) ----------
create table public.plan_entries (
  couple_id  uuid not null references public.couples(id) on delete cascade,
  key        text not null,                               -- ex.: 'd3_apr', 'sinal', 'done_12'
  value      jsonb,
  updated_by uuid references auth.users(id),
  updated_at timestamptz not null default now(),
  primary key (couple_id, key)
);
alter table public.plan_entries enable row level security;
create policy "casal lê o plano"     on public.plan_entries for select using (couple_id = my_couple());
create policy "casal escreve o plano" on public.plan_entries for insert with check (couple_id = my_couple() and updated_by = auth.uid());
create policy "casal atualiza o plano" on public.plan_entries for update using (couple_id = my_couple()) with check (couple_id = my_couple() and updated_by = auth.uid());

-- ---------- notas de 1 a 10 (Semana 2 e Dia 28) ----------
create table public.ratings (
  user_id    uuid not null references auth.users(id) on delete cascade,
  couple_id  uuid not null references public.couples(id) on delete cascade,
  round      text not null check (round in ('w2','d28')),
  item       text not null check (item in ('int','pai','com','pcom','apr','sex','psat','conf','sat')),
  value      smallint not null check (value between 1 and 10),
  updated_at timestamptz not null default now(),
  primary key (user_id, round, item)
);

-- a pessoa completou as 9 notas da rodada?
create or replace function public.round_complete(r text) returns boolean
language sql stable security definer set search_path = public as $$
  select count(*) = 9 from ratings where user_id = auth.uid() and round = r;
$$;

alter table public.ratings enable row level security;
create policy "ler minhas notas" on public.ratings for select using (user_id = auth.uid());
create policy "ler notas do parceiro depois de completar as minhas" on public.ratings for select
  using (user_id = partner_id() and round_complete(round));
create policy "gravar minhas notas" on public.ratings for insert with check (user_id = auth.uid() and couple_id = my_couple());
create policy "mudar minhas notas"  on public.ratings for update using (user_id = auth.uid()) with check (user_id = auth.uid());

-- ---------- exercícios individuais ----------
create table public.private_entries (
  user_id    uuid not null references auth.users(id) on delete cascade,
  key        text not null,                               -- ex.: 'd25_com', 'd25_sem'
  value      jsonb,
  updated_at timestamptz not null default now(),
  primary key (user_id, key)
);
alter table public.private_entries enable row level security;
create policy "só eu" on public.private_entries for all using (user_id = auth.uid()) with check (user_id = auth.uid());

-- ---------- leads do Mapa do Casal ----------
create table public.leads (
  id         uuid primary key default gen_random_uuid(),
  email      text not null check (email ~* '^[^@\s]+@[^@\s]+\.[^@\s]{2,}$'),
  consent    boolean not null check (consent),            -- caixa de consentimento obrigatória no quiz
  source     text not null default 'mapa-do-casal',
  result     jsonb,                                       -- pilar mais baixo, padrão de conflito, maior distância
  created_at timestamptz not null default now()
);
alter table public.leads enable row level security;
create policy "quiz grava lead" on public.leads for insert to anon, authenticated with check (true);
-- sem política de leitura: você consulta pelo painel do Supabase

-- ---------- o app só funciona para quem tem acesso ou foi convidado ----------
-- (verificação no app: after login, chamar has_access() ou my_couple(); se os dois forem vazios, mostrar a página de compra)
