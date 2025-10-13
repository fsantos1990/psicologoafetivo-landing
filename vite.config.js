// vite.config.js – versão simples, sem plugin
import { defineConfig } from 'vite'

export default defineConfig({
  base: '/',
  publicDir: 'public',
  build: { outDir: 'dist' }
})
