-- Ajustes de segurança do app do casal (revisão de 09/11/2026).
-- Não muda o comportamento para quem está logado; fecha portas que não eram usadas.

-- 1. Funções do app só para quem está logado.
--    Antes: qualquer visitante anônimo podia chamar /rest/v1/rpc/<função>.
--    Nenhuma página pública usa essas funções (o quiz grava em leads e a avaliação em avaliacoes, sem elas).
revoke execute on function public.create_couple()        from public, anon;
revoke execute on function public.join_couple(text)      from public, anon;
revoke execute on function public.has_access()           from public, anon;
revoke execute on function public.my_couple()            from public, anon;
revoke execute on function public.partner_id()           from public, anon;
revoke execute on function public.round_complete(text)   from public, anon;
grant  execute on function public.create_couple()        to authenticated;
grant  execute on function public.join_couple(text)      to authenticated;
grant  execute on function public.has_access()           to authenticated;
grant  execute on function public.my_couple()            to authenticated;
grant  execute on function public.partner_id()           to authenticated;
grant  execute on function public.round_complete(text)   to authenticated;

-- 2. Ao editar uma nota, a pessoa não pode mover a nota para outro casal.
--    Antes: o UPDATE só conferia user_id, então dava para trocar couple_id por qualquer outro.
drop policy if exists "mudar minhas notas" on public.ratings;
create policy "mudar minhas notas" on public.ratings for update
  using (user_id = auth.uid())
  with check (user_id = auth.uid() and couple_id = my_couple());

-- 3. Duas pessoas entrando no mesmo código ao mesmo tempo não podem formar um "casal" de três.
--    Antes: a contagem de membros não travava a linha do casal.
create or replace function public.join_couple(code text) returns public.couples
language plpgsql security definer set search_path = public as $$
declare c couples; n int;
begin
  if auth.uid() is null then raise exception 'Faça login primeiro'; end if;
  if my_couple() is not null then raise exception 'Você já faz parte de um casal'; end if;
  select * into c from couples where invite_code = upper(trim(code)) for update;
  if c.id is null then raise exception 'Código não encontrado'; end if;
  select count(*) into n from couple_members where couple_id = c.id;
  if n >= 2 then raise exception 'Este casal já tem duas pessoas'; end if;
  -- o parceiro entra pelo convite de quem comprou, sem precisar de compra própria
  insert into couple_members (couple_id, user_id) values (c.id, auth.uid());
  return c;
end $$;
-- create or replace preserva as permissões; reforço por garantia:
revoke execute on function public.join_couple(text) from public, anon;
grant  execute on function public.join_couple(text) to authenticated;
