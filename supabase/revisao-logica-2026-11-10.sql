-- Revisão de lógica do app do casal (10/11/2026).

-- 1. Reembolso ou cancelamento tira o acesso do casal inteiro.
--    Antes: bastava já estar em um casal para ler o conteúdo do plano, mesmo com a compra desativada.
--    Agora: o casal precisa ter pelo menos uma pessoa com compra ativa.
create or replace function public.couple_has_access() returns boolean
language sql stable security definer set search_path = public as $$
  select exists (
    select 1
    from couple_members m
    join auth.users u on u.id = m.user_id
    join entitlements e on e.email = lower(u.email) and e.active
    where m.couple_id = my_couple()
  );
$$;
revoke execute on function public.couple_has_access() from public, anon;
grant  execute on function public.couple_has_access() to authenticated;

drop policy if exists "conteudo para quem tem acesso" on public.app_content;
create policy "conteudo para quem tem acesso" on public.app_content for select to authenticated
  using (has_access() or couple_has_access());

-- 2. Notas de 1 a 10: o par só aparece quando os dois terminam, e nesse momento as notas travam.
--    Antes: quem completava as próprias já lia as do par (mesmo incompletas) e podia mudar as suas depois de ver.
create or replace function public.round_both_complete(r text) returns boolean
language sql stable security definer set search_path = public as $$
  select (select count(*) from ratings where user_id = auth.uid()   and couple_id = my_couple() and round = r) = 9
     and (select count(*) from ratings where user_id = partner_id() and couple_id = my_couple() and round = r) = 9;
$$;
revoke execute on function public.round_both_complete(text) from public, anon;
grant  execute on function public.round_both_complete(text) to authenticated;

drop policy if exists "ler notas do parceiro depois de completar as minhas" on public.ratings;
drop policy if exists "ler notas do parceiro quando os dois completam" on public.ratings;
create policy "ler notas do parceiro quando os dois completam" on public.ratings for select
  using (user_id = partner_id() and round_both_complete(round));

drop policy if exists "mudar minhas notas" on public.ratings;
create policy "mudar minhas notas" on public.ratings for update
  using (user_id = auth.uid() and not round_both_complete(round))
  with check (user_id = auth.uid() and couple_id = my_couple());

-- 3. Sair do casal, para quem entrou com o código errado. Só vale antes de existir qualquer registro.
--    Se sobrar alguém no casal, o código de convite é trocado; se não sobrar ninguém, o casal é apagado.
create or replace function public.leave_couple() returns void
language plpgsql security definer set search_path = public as $$
declare c uuid := my_couple();
begin
  if auth.uid() is null then raise exception 'Faça login primeiro'; end if;
  if c is null then raise exception 'Você não faz parte de um casal'; end if;
  perform 1 from couples where id = c for update;
  if exists (select 1 from plan_entries where couple_id = c)
     or exists (select 1 from ratings where couple_id = c) then
    raise exception 'O plano já tem registros, então não dá para sair por aqui. Fale com @psicologoafetivo no Instagram';
  end if;
  delete from couple_members where couple_id = c and user_id = auth.uid();
  if exists (select 1 from couple_members where couple_id = c) then
    update couples set invite_code = upper(substr(md5(gen_random_uuid()::text), 1, 8)) where id = c;
  else
    delete from couples where id = c;
  end if;
end $$;
revoke execute on function public.leave_couple() from public, anon;
grant  execute on function public.leave_couple() to authenticated;
