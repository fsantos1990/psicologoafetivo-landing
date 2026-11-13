# Reciclagem semanal (@psicologoafetivo)

Rotina semanal executada pelo Claude:
1. Avalia reciclagens com 7+ dias (Metricool, IG feed posts: alcance, salvamentos, compartilhamentos) e preenche `veredito` em `reciclagem.json`.
2. Escolhe o post antigo com maior (salvamentos + 2×compartilhamentos + interações) que não foi reciclado nos últimos 90 dias e não está "esgotado".
3. Cria `recycled/rNN_<tema>.py` (mesmo formato de `r01`), renderiza com `tools/render.py` e salva em `client/public/ig/recycled/`.
4. Adiciona artigo no topo de `client/src/data/blogPosts.ts` (imagem em `client/public/blog/`), com links para `/livro/` e `/mapa/`.
5. Testa `npx vite build`, faz commit e push em `main` (Vercel publica).
6. Agenda o carrossel no Metricool para o sábado seguinte, 19h, publicação automática.

## Captação de ideias

`python3 tools/ideias.py` (ou `--fundo` para mais sugestões) gera `ideias/AAAA-MM-DD.md` com:
- assuntos em alta no Brasil ligados a relacionamento (Google Trends, últimas ~24 h, onde aparece a fofoca do momento);
- o que as pessoas digitam no Google sobre marido, namorado, traição, desejo, terapia etc., com 🆕 no que é novo desde a rodada anterior.
Sementes e filtros ficam no topo do script.

## Regras de texto (10/11/2026)

- O diagnóstico vem antes do livro: a chamada é "Comece pelo diagnóstico gratuito" e, depois, o livro.
- Toda peça que cita o diagnóstico avisa que ele é uma avaliação educativa, não um diagnóstico psicológico. Nas legendas, use `AVISO_CAP` de `tools/render.py`; no último slide o aviso entra sozinho; `render()` recusa legenda sem o aviso.
