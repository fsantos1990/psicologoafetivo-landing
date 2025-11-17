import React from 'react'
import ReactDOM from 'react-dom/client'

// Esse arquivo existe só para o Vite/Vercel ficarem felizes.
// Ele NÃO interfere na sua home estática, porque não existe #root.

const rootElement = document.getElementById('root')

if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      {/* Se um dia quiser voltar a usar React na home, coloca algo aqui */}
      <></>
    </React.StrictMode>
  )
}
