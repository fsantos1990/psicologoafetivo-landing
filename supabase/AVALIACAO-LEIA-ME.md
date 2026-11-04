# Questionários de avaliação do casal

Páginas:
- `/avaliacao/?c=CODIGO&p=NOME` formulário que o cliente responde (PT/EN, celular e PC)
- `/avaliacao/painel/` painel do terapeuta: gera links, lista respostas, mostra escores e comparativo do casal

Arquivos:
- `client/public/avaliacao/instrumentos.js` itens dos 5 questionários e regras de correção
- `client/public/avaliacao/config.js` URL e anon key do Supabase
- `supabase/avaliacao.sql` tabela e regras de acesso (RLS)
- `supabase/functions/aviso-avaliacao/index.ts` e-mail de aviso (opcional)

## Configuração (uma vez, ~15 min)

1. **Banco.** Supabase > SQL Editor > cole `supabase/avaliacao.sql` > Run.
2. **Seu login.** Supabase > Authentication > Users > Add user > seu e-mail (o painel entra por link mágico; ninguém mais consegue criar conta).
   Em Authentication > URL Configuration, adicione `https://www.psicologoafetivo.com.br/avaliacao/painel/` em Redirect URLs.
3. **Chaves.** Supabase > Project Settings > API: copie Project URL e anon public key para `client/public/avaliacao/config.js`.
4. **Aviso por e-mail (opcional).**
   - Crie conta gratuita na Resend e verifique o domínio psicologoafetivo.com.br.
   - `supabase functions deploy aviso-avaliacao` (ou crie a função pelo painel colando o arquivo).
   - Edge Functions > Secrets: `RESEND_API_KEY`, `AVISO_PARA`, `AVISO_DE`.
   - Database > Webhooks > Create: tabela `avaliacoes`, evento Insert, destino a função `aviso-avaliacao`.
   O e-mail traz só o código do casal e o nome. As respostas ficam no painel.
5. Publique no Vercel (merge na branch principal).

## Escores
- Satisfação (CSI-16): 0 a 81. Verde > 68, amarela 52 a 68, vermelha < 52.
- Frequência e Aceitabilidade: frequência convertida para vezes/mês; aceitabilidade 0–9; destaca itens ≤ 3; média por bloco.
- Compromisso: dois itens 0–5; alerta se algum ≤ 2.
- Áreas: 1–6 por área, média, áreas ≥ 5 e as 3 escolhidas.
- Segurança: alerta se houver agressão (A, B, item 18) ou medo de represália (C).
