# psicologoafetivo-landing

Landing page em React + Vite + Tailwind.

## Rodar localmente
```bash
npm install
npm run dev
```

## Build de produção
```bash
npm run build
npm run preview
```

## Deploy na Vercel (recomendado)
1. Crie um repositório no GitHub e envie estes arquivos.
2. Na Vercel, clique em **New Project** > **Import Git Repository** e selecione seu repo.
3. Configure o **Framework Preset** como **Vite** (auto) e deploy.
4. Em **Settings > Domains**, adicione `psicologoafetivo.com.br` e siga as instruções de DNS.

## Ajustes rápidos
- Atualize o link do WhatsApp em `src/App.jsx` (procure por `https://api.whatsapp.com/send?phone=`).
- Política de Privacidade/Termos: ajuste os links no rodapé.
- Cores e tipografia: utilize classes Tailwind (ex.: `text-[#235FAA]`).
