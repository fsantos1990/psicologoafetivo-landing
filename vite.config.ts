import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  publicDir: 'public',   // garante que o Vite copie a pasta
  base: '/',             // garante paths absolutos
  build: { outDir: 'dist' }
})
