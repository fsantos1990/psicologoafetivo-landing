-- Aviso por e-mail a cada avaliação nova (já aplicado no projeto em 04/11/2026).
-- A chave do Resend fica no Vault com o nome 'resend_api_key' e nunca neste arquivo.
-- Para trocar a chave: select vault.update_secret((select id from vault.secrets where name='resend_api_key'), 'NOVA_CHAVE');
create extension if not exists pg_net with schema extensions;

create or replace function public.avisar_nova_avaliacao()
returns trigger language plpgsql security definer set search_path = public, extensions as $$
declare
  chave text;
  painel text := 'https://www.psicologoafetivo.com.br/avaliacao/painel/?casal=' || replace(new.casal, ' ', '%20');
begin
  select decrypted_secret into chave from vault.decrypted_secrets where name = 'resend_api_key' limit 1;
  if chave is null then return new; end if;
  perform net.http_post(
    url := 'https://api.resend.com/emails',
    headers := jsonb_build_object('Authorization', 'Bearer ' || chave, 'Content-Type', 'application/json'),
    body := jsonb_build_object(
      'from', 'Avaliações <onboarding@resend.dev>',   -- trocar após verificar o domínio no Resend
      'to', jsonb_build_array('majinho@msn.com'),     -- com o remetente de teste, só o dono da conta Resend recebe
      'subject', 'Nova avaliação recebida: ' || new.casal,
      'text', 'Chegou uma avaliação nova.' || chr(10) || chr(10) ||
              'Casal: ' || new.casal || chr(10) || 'Parceiro(a): ' || new.parceiro || chr(10) || chr(10) ||
              'Abra o painel para ver respostas e escores:' || chr(10) || painel));
  return new;
exception when others then return new; -- o aviso nunca impede a gravação da resposta
end; $$;

revoke all on function public.avisar_nova_avaliacao() from public, anon, authenticated;
drop trigger if exists avaliacoes_aviso on public.avaliacoes;
create trigger avaliacoes_aviso after insert on public.avaliacoes for each row execute function public.avisar_nova_avaliacao();
