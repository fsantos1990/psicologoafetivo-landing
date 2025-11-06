// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    // Faz /blog/ (e subrotas) irem pro index.html do blog em dev
    historyApiFallback: {
      rewrites: [
        { from: /^\/blog(?:\/.*)?$/, to: '/blog/index.html' },
      ],
    },
  },
})
