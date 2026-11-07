# Reciclagem semanal (@psicologoafetivo)

Rotina semanal executada pelo Claude:
1. Avalia reciclagens com 7+ dias (Metricool, IG feed posts: alcance, salvamentos, compartilhamentos) e preenche `veredito` em `reciclagem.json`.
2. Escolhe o post antigo com maior (salvamentos + 2×compartilhamentos + interações) que não foi reciclado nos últimos 90 dias e não está "esgotado".
3. Cria `recycled/rNN_<tema>.py` (mesmo formato de `r01`), renderiza com `tools/render.py` e salva em `client/public/ig/recycled/`.
4. Adiciona artigo no topo de `client/src/data/blogPosts.ts` (imagem em `client/public/blog/`), com links para `/livro/` e `/mapa/`.
5. Testa `npx vite build`, faz commit e push em `main` (Vercel publica).
6. Agenda o carrossel no Metricool para o sábado seguinte, 19h, publicação automática.
