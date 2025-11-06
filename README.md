
# Blog estático automático (Markdown → HTML)

## Como usar
1. Instale as dependências:
   ```bash
   npm i gray-matter marked fs-extra slugify date-fns
   ```

2. Adicione ao seu `package.json`:
   ```json
   {
     "scripts": {
       "build:blog": "node scripts/build-blog.mjs",
       "build": "vite build"
     }
   }
   ```

3. No Vercel, use o comando de build:
   ```bash
   npm run build:blog && npm run build
   ```

4. Escreva artigos em **Markdown** dentro de `content/blog/`:
   ```md
   ---
   title: "Título do Post"
   date: "2025-10-20"
   featuredImage: "/og.jpg"
   description: "Resumo curto (até 160 caracteres)."
   category: "Categoria"
   ---

   Seu conteúdo em **Markdown** aqui.
   ```

5. O script vai gerar:
   - `public/blog/<slug>/index.html` (cada artigo)
   - `public/blog/index.html` (listagem)
   - Os artigos usam header/footer e **/blog/blog.css** (tema claro)

## Estrutura incluida
```
blog_starter/
  content/blog/
  public/blog/blog.css
  scripts/build-blog.mjs
  templates/article.html
  templates/blog-index.html
  README.md
```

