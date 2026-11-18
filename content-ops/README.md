# Reciclagem semanal (@psicologoafetivo)

Rotina semanal executada pelo Claude:
1. Avalia reciclagens com 7+ dias (Metricool, IG feed posts: alcance, salvamentos, compartilhamentos) e preenche `veredito` em `reciclagem.json`.
2. Escolhe o post antigo com maior (salvamentos + 2×compartilhamentos + interações) que não foi reciclado nos últimos 90 dias e não está "esgotado".
3. Cria `recycled/rNN_<tema>.py` (mesmo formato de `r01`), renderiza com `tools/render.py` e salva em `client/public/ig/recycled/`.
4. Adiciona artigo no topo de `client/src/data/blogPosts.ts` (imagem em `client/public/blog/`), com links para `/livro/` e `/mapa/`.
5. Testa `npx vite build`, faz commit e push em `main` (Vercel publica).
6. Coloca o carrossel na fila para o sábado seguinte, 19h, com `tools/agendar.py` (ver "Publicação").

## Captação de ideias

`python3 tools/ideias.py` (ou `--fundo` para mais sugestões) gera `ideias/AAAA-MM-DD.md` com:
- assuntos em alta no Brasil ligados a relacionamento (Google Trends, últimas ~24 h, onde aparece a fofoca do momento);
- o que as pessoas digitam no Google sobre marido, namorado, traição, desejo, terapia etc., com 🆕 no que é novo desde a rodada anterior.
Sementes e filtros ficam no topo do script.

## Regras de texto (10/11/2026)

- O diagnóstico vem antes do livro: a chamada é "Comece pelo diagnóstico gratuito" e, depois, o livro.
- Toda peça que cita o diagnóstico avisa que ele é uma avaliação educativa, não um diagnóstico psicológico. Nas legendas, use `AVISO_CAP` de `tools/render.py`; no último slide o aviso entra sozinho; `render()` recusa legenda sem o aviso.

## Publicação (sem Metricool, desde 18/11/2026)

A publicação usa a API oficial do Instagram (Instagram API with Instagram Login) e o GitHub Actions.

- `fila.json`: tudo o que vai ao ar. Status: `pendente`, `publicado` (com link) ou `falhou` (após 3 tentativas, com o erro).
- `tools/agendar.py`: põe uma peça na fila. Arquivos fora de `client/public` são copiados para `client/public/ig/fila/<id>/`.
  `python3 content-ops/tools/agendar.py --quando "2026-12-03 19:00" --tipo carrossel --legenda-de content-ops/posts/2026-12-03_sozinha.py client/public/ig/posts/2026-12-03_sozinha_{1,2,3,4,5}.png`
- Depois de agendar: commit e push em `main`. A Vercel publica as imagens no site, e o Instagram lê de lá.
- `tools/publicar.py --teste`: valida a fila e confere se as imagens já estão no ar.
- `.github/workflows/publicar-instagram.yml`: roda a cada 15 min entre 18:00 e 20:45 (Salvador). Horário fora dessa janela exige mudar o cron.
- `.github/workflows/responder-mapa.yml`: de hora em hora (8h–23h), manda DM com o link do diagnóstico para quem comentou MAPA e responde o comentário. Registro em `respostas_mapa.json`.
- `.github/workflows/renovar-token-instagram.yml`: renova o token nos dias 1 e 15.

Secrets do repositório: `IG_ACCESS_TOKEN`, `IG_USER_ID`, `GH_PAT` (token do GitHub com permissão "Secrets: read and write" neste repositório).
