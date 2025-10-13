# Decodificando o Amor — Landing Page (HTML estático)

Este pacote contém uma página de vendas leve, sem build, pronta para subir em qualquer host estático (Vercel, Netlify, GitHub Pages, Hostinger, etc.).

## Como usar
1. Abra `index.html` e edite no bloco **CONFIG**:
   - `price`: preço exibido.
   - `checkoutUrl`: cole o link da Hotmart, Gumroad ou outro checkout.
2. Substitua `./assets/capa-placeholder.png` pela sua capa final (mesmo nome de arquivo) ou ajuste o caminho no HTML.
3. (Opcional) Edite benefícios, capítulos e FAQ no mesmo bloco **CONFIG**.

## Publicação rápida
- Basta enviar a pasta para o seu servidor/host. Não requer Node, React ou build.
- Tailwind está entrando via CDN do Tailwind Play.

## SEO/Analytics
- O arquivo inclui JSON-LD básico (`type: Book`). Se quiser, insira Google Analytics/Meta Pixel antes do `</body>`.

---
© 2025 Felipe Melo Souza Santos — @psicologoafetivo
