# Instrumentos para pacientes

Páginas (todas fora do Google, `noindex`):
- `/checkin/` check-in semanal. Sem login. Identificação por nome e e-mail (obrigatório). O painel gera um link pessoal que já vem preenchido.
- `/valores/` mapa de valores. O paciente entra com o e-mail (link de acesso, sem senha), preenche e pode voltar e alterar.
- `/pacientes/` painel do terapeuta: cadastro de pacientes, links, evolução dos check-ins, mapa de valores e histórico de alterações.

Arquivos:
- `client/public/pacientes/instrumentos.js` perguntas, emoções, áreas de vida e o gráfico do mapa. Para mudar uma pergunta, mude aqui (sem trocar os ids).
- `client/public/pacientes/base.css` estilo comum.
- `client/public/avaliacao/config.js` URL e chave pública do Supabase e e-mail do terapeuta (compartilhado com a avaliação de casal).
- `supabase/instrumentos-pacientes.sql` tabelas, regras de acesso (RLS), log e aviso por e-mail.

## Quem acessa o quê

| Dado | Paciente | Terapeuta | Qualquer outra pessoa |
|---|---|---|---|
| Check-ins (`checkins`) | só envia | lê, marca como lido, apaga | só envia (não lê nada) |
| Mapa de valores (`valores_mapas`) | lê e edita o próprio, se cadastrado e ativo | lê e apaga | nada |
| Histórico (`valores_log`) | nada | lê | nada |
| Lista de pacientes (`pacientes`) | vê só a própria linha | gerencia | nada |

O terapeuta é quem entra com `psicologoafetivo@gmail.com` (definido em `is_terapeuta()` no SQL e em `config.js`).

## Log de alterações

Cada gravação do mapa gera uma linha em `valores_log`, escrita por um gatilho do banco: data e hora, e-mail de quem gravou,
ação (`criou`, `alterou`, `apagou`), os campos que mudaram com valor antigo e novo (`mudancas`) e uma cópia do mapa inteiro (`dados`).
Ninguém escreve nem apaga o log pela API, nem o terapeuta. Para atender um pedido de exclusão (LGPD), apague pelo painel do Supabase.

## Aviso por e-mail

A cada check-in, o gatilho `checkins_aviso` envia um e-mail pelo Resend (remetente `avisos@psicologoafetivo.com.br`, chave no Vault como `resend_api_key`)
para `psicologoafetivo@gmail.com`. O e-mail leva só o nome e o link do painel, nunca as respostas.

## Limites

- Check-in: até 6 envios por e-mail a cada 24 h.
- O check-in aceita qualquer e-mail (não há login); envios de e-mails não cadastrados aparecem separados no painel.
