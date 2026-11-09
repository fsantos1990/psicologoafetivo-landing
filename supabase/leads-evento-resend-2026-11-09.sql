-- Sequência de e-mails do diagnóstico (Resend Automations).
-- Ao gravar um lead com consentimento, dispara o evento "diagnostico.concluido" no Resend,
-- que cria o contato e inicia a automação "Diagnóstico do casal · sequência de 7 dias".
-- A chave fica no Vault com o nome resend_events_key (precisa de acesso completo; a resend_api_key é só de envio).
-- Sem a chave, o gatilho não faz nada. Falhas nunca impedem a gravação do lead.

create or replace function public.enviar_evento_diagnostico()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  chave text;
  pl jsonb := coalesce(new.result->'plano', '[]'::jsonb);
begin
  if not coalesce(new.consent, false) then return new; end if;
  -- quem refaz o diagnóstico em menos de 30 dias não recomeça a sequência
  if exists (select 1 from public.leads l where l.email = new.email and l.id <> new.id
             and l.created_at > now() - interval '30 days') then return new; end if;
  select decrypted_secret into chave from vault.decrypted_secrets where name = 'resend_events_key' limit 1;
  if chave is null then return new; end if;
  perform net.http_post(
    url := 'https://api.resend.com/events/send',
    headers := jsonb_build_object('Authorization', 'Bearer ' || chave, 'Content-Type', 'application/json'),
    body := jsonb_build_object(
      'event', 'diagnostico.concluido',
      'email', new.email,
      'payload', jsonb_build_object(
        'pilar',    coalesce(new.result->>'pilar_txt', 'Seu resultado'),
        'conflito', coalesce(new.result->>'conflito_txt', 'veja no diagnóstico'),
        'plano_1', coalesce(pl->>0, ''), 'plano_2', coalesce(pl->>1, ''), 'plano_3', coalesce(pl->>2, ''),
        'plano_4', coalesce(pl->>3, ''), 'plano_5', coalesce(pl->>4, ''), 'plano_6', coalesce(pl->>5, ''),
        'plano_7', coalesce(pl->>6, '')
      )
    )
  );
  return new;
exception when others then
  return new;
end;
$$;

revoke all on function public.enviar_evento_diagnostico() from public, anon, authenticated;

drop trigger if exists leads_evento_resend on public.leads;
create trigger leads_evento_resend
  after insert on public.leads
  for each row execute function public.enviar_evento_diagnostico();
