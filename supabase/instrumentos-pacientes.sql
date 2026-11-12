-- Instrumentos para pacientes: check-in semanal e mapa de valores.
-- Aplicado no projeto em 11/11/2026. Pode ser rodado de novo sem perder dados.
--
-- Quem acessa o quê:
--   check-in  : qualquer pessoa com o link ENVIA; só o terapeuta lê, marca como lido e apaga.
--   valores   : só o paciente logado (e-mail confirmado e cadastrado em pacientes) lê e edita o próprio mapa;
--               o terapeuta lê. Ninguém mais.
--   log       : cada gravação do mapa gera uma linha em valores_log (quando, quem, o que mudou).
--               Só o terapeuta lê. Ninguém escreve nem apaga pela API: quem grava é o gatilho do banco.

-- ---------- quem é o terapeuta ----------
create or replace function public.is_terapeuta() returns boolean
language sql stable set search_path = public as $$
  select coalesce(lower(auth.jwt() ->> 'email') = 'psicologoafetivo@gmail.com', false);
$$;
revoke execute on function public.is_terapeuta() from public, anon;
grant  execute on function public.is_terapeuta() to authenticated;

-- ---------- pacientes (lista de e-mails liberados) ----------
create table if not exists public.pacientes (
  email     text primary key check (email = lower(email) and email ~ '^[^@\s]+@[^@\s]+\.[^@\s]{2,}$' and char_length(email) <= 120),
  nome      text not null check (char_length(nome) between 1 and 80),
  ativo     boolean not null default true,
  criado_em timestamptz not null default now()
);
alter table public.pacientes enable row level security;

create or replace function public.is_paciente() returns boolean
language sql stable security definer set search_path = public as $$
  select exists (select 1 from pacientes where email = lower(auth.jwt() ->> 'email') and ativo);
$$;
revoke execute on function public.is_paciente() from public, anon;
grant  execute on function public.is_paciente() to authenticated;

drop policy if exists "terapeuta gerencia pacientes" on public.pacientes;
create policy "terapeuta gerencia pacientes" on public.pacientes
  for all to authenticated using (is_terapeuta()) with check (is_terapeuta());
-- o paciente enxerga só a própria linha (para a página saber se o e-mail está liberado)
drop policy if exists "paciente ve o proprio cadastro" on public.pacientes;
create policy "paciente ve o proprio cadastro" on public.pacientes
  for select to authenticated using (email = lower(auth.jwt() ->> 'email') and ativo);

revoke all on public.pacientes from anon, authenticated;
grant select, insert, update, delete on public.pacientes to authenticated;

-- ---------- check-in semanal ----------
create table if not exists public.checkins (
  id            uuid primary key default gen_random_uuid(),
  criado_em     timestamptz not null default now(),
  email         text not null check (email = lower(email) and email ~ '^[^@\s]+@[^@\s]+\.[^@\s]{2,}$' and char_length(email) <= 120),
  nome          text not null check (char_length(nome) between 1 and 80),
  versao        int  not null default 1,
  consentimento boolean not null check (consentimento = true),
  respostas     jsonb not null check (jsonb_typeof(respostas) = 'object' and pg_column_size(respostas) < 20000),
  lido          boolean not null default false
);
create index if not exists checkins_email_idx on public.checkins (email, criado_em desc);
alter table public.checkins enable row level security;

drop policy if exists "envio publico" on public.checkins;
create policy "envio publico" on public.checkins
  for insert to anon with check (consentimento = true and lido = false);
drop policy if exists "terapeuta le" on public.checkins;
create policy "terapeuta le" on public.checkins for select to authenticated using (is_terapeuta());
drop policy if exists "terapeuta atualiza" on public.checkins;
create policy "terapeuta atualiza" on public.checkins for update to authenticated using (is_terapeuta()) with check (is_terapeuta());
drop policy if exists "terapeuta apaga" on public.checkins;
create policy "terapeuta apaga" on public.checkins for delete to authenticated using (is_terapeuta());

revoke all on public.checkins from anon, authenticated;
grant insert (email, nome, versao, consentimento, respostas) on public.checkins to anon;
grant select, update (lido), delete on public.checkins to authenticated;

-- freio contra abuso: no máximo 6 envios por e-mail a cada 24 h
create or replace function public.checkins_limite() returns trigger
language plpgsql security definer set search_path = public as $$
begin
  if (select count(*) from checkins where email = new.email and criado_em > now() - interval '24 hours') >= 6 then
    raise exception 'Muitos envios hoje para este e-mail. Tente amanhã.';
  end if;
  return new;
end $$;
revoke all on function public.checkins_limite() from public, anon, authenticated;
drop trigger if exists checkins_limite on public.checkins;
create trigger checkins_limite before insert on public.checkins for each row execute function public.checkins_limite();

-- aviso por e-mail (Resend, chave no Vault como 'resend_api_key'). O e-mail não leva respostas, só o nome e o link do painel.
create or replace function public.avisar_novo_checkin() returns trigger
language plpgsql security definer set search_path = public, extensions as $$
declare
  chave text;
  cadastrado boolean;
begin
  -- enxurrada de envios não vira enxurrada de e-mails
  if (select count(*) from checkins where criado_em > now() - interval '1 hour') > 30 then return new; end if;
  select decrypted_secret into chave from vault.decrypted_secrets where name = 'resend_api_key' limit 1;
  if chave is null then return new; end if;
  select exists (select 1 from pacientes where email = new.email) into cadastrado;
  perform net.http_post(
    url := 'https://api.resend.com/emails',
    headers := jsonb_build_object('Authorization', 'Bearer ' || chave, 'Content-Type', 'application/json'),
    body := jsonb_build_object(
      'from', 'Pacientes <avisos@psicologoafetivo.com.br>',
      'to', jsonb_build_array('psicologoafetivo@gmail.com'),
      'subject', 'Check-in semanal recebido: ' || new.nome,
      'text', 'Chegou um check-in semanal de ' || new.nome || '.' ||
              case when cadastrado then '' else chr(10) || 'Atenção: o e-mail usado não está na sua lista de pacientes.' end ||
              chr(10) || chr(10) || 'Abra o painel para ler:' || chr(10) ||
              'https://www.psicologoafetivo.com.br/pacientes/'));
  return new;
exception when others then return new; -- o aviso nunca impede a gravação
end $$;
revoke all on function public.avisar_novo_checkin() from public, anon, authenticated;
drop trigger if exists checkins_aviso on public.checkins;
create trigger checkins_aviso after insert on public.checkins for each row execute function public.avisar_novo_checkin();

-- ---------- mapa de valores (um por paciente, regravável) ----------
create table if not exists public.valores_mapas (
  email         text primary key check (email = lower(email)),
  dados         jsonb not null default '{}'::jsonb check (jsonb_typeof(dados) = 'object' and pg_column_size(dados) < 100000),
  consentimento boolean not null check (consentimento = true),
  criado_em     timestamptz not null default now(),
  atualizado_em timestamptz not null default now()
);
alter table public.valores_mapas enable row level security;

drop policy if exists "paciente le o proprio mapa" on public.valores_mapas;
create policy "paciente le o proprio mapa" on public.valores_mapas
  for select to authenticated using (email = lower(auth.jwt() ->> 'email') and is_paciente());
drop policy if exists "paciente cria o proprio mapa" on public.valores_mapas;
create policy "paciente cria o proprio mapa" on public.valores_mapas
  for insert to authenticated with check (email = lower(auth.jwt() ->> 'email') and is_paciente());
drop policy if exists "paciente edita o proprio mapa" on public.valores_mapas;
create policy "paciente edita o proprio mapa" on public.valores_mapas
  for update to authenticated
  using (email = lower(auth.jwt() ->> 'email') and is_paciente())
  with check (email = lower(auth.jwt() ->> 'email') and is_paciente());
drop policy if exists "terapeuta le os mapas" on public.valores_mapas;
create policy "terapeuta le os mapas" on public.valores_mapas for select to authenticated using (is_terapeuta());
drop policy if exists "terapeuta apaga mapa" on public.valores_mapas;
create policy "terapeuta apaga mapa" on public.valores_mapas for delete to authenticated using (is_terapeuta());

revoke all on public.valores_mapas from anon, authenticated;
grant select, insert (email, dados, consentimento), update (dados, consentimento), delete on public.valores_mapas to authenticated;

-- ---------- log de alterações do mapa ----------
create table if not exists public.valores_log (
  id       bigint generated always as identity primary key,
  em       timestamptz not null default now(),
  email    text not null,           -- de quem é o mapa
  autor    text,                    -- e-mail de quem fez a alteração
  acao     text not null check (acao in ('criou','alterou','apagou')),
  mudancas jsonb,                   -- { campo: { "de": valor antigo, "para": valor novo } }
  dados    jsonb                    -- cópia do mapa inteiro depois da alteração (ou antes, se apagou)
);
create index if not exists valores_log_email_idx on public.valores_log (email, em desc);
alter table public.valores_log enable row level security;
drop policy if exists "terapeuta le o log" on public.valores_log;
create policy "terapeuta le o log" on public.valores_log for select to authenticated using (is_terapeuta());
revoke all on public.valores_log from anon, authenticated;
grant select on public.valores_log to authenticated;

create or replace function public.valores_antes() returns trigger
language plpgsql set search_path = public as $$
begin
  new.atualizado_em := now();
  if tg_op = 'UPDATE' then new.email := old.email; new.criado_em := old.criado_em; end if;
  return new;
end $$;
drop trigger if exists valores_antes on public.valores_mapas;
create trigger valores_antes before insert or update on public.valores_mapas for each row execute function public.valores_antes();

create or replace function public.valores_registrar() returns trigger
language plpgsql security definer set search_path = public as $$
declare
  m jsonb := '{}'::jsonb;
  k text;
  quem text := lower(coalesce(auth.jwt() ->> 'email', session_user::text));
begin
  if tg_op = 'DELETE' then
    insert into valores_log (email, autor, acao, dados) values (old.email, quem, 'apagou', old.dados);
    return old;
  end if;
  if tg_op = 'UPDATE' and new.dados is not distinct from old.dados then return new; end if;
  for k in
    select jsonb_object_keys(new.dados)
    union
    select jsonb_object_keys(case when tg_op = 'UPDATE' then old.dados else '{}'::jsonb end)
  loop
    if tg_op = 'INSERT' or (old.dados -> k) is distinct from (new.dados -> k) then
      m := m || jsonb_build_object(k, jsonb_build_object(
        'de',   case when tg_op = 'UPDATE' then old.dados -> k else null end,
        'para', new.dados -> k));
    end if;
  end loop;
  insert into valores_log (email, autor, acao, mudancas, dados)
  values (new.email, quem, case when tg_op = 'INSERT' then 'criou' else 'alterou' end, m, new.dados);
  return new;
end $$;
revoke all on function public.valores_registrar() from public, anon, authenticated;
drop trigger if exists valores_registrar on public.valores_mapas;
create trigger valores_registrar after insert or update or delete on public.valores_mapas for each row execute function public.valores_registrar();
