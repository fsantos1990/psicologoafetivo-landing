import React from 'react'
import ReactDOM from 'react-dom/client'

// Esse arquivo existe só para o Vite/Vercel ficarem felizes.
// Ele não renderiza nada na página, a não ser que exista uma div #root.

const rootElement = document.getElementById('root')

if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      {/* Se um dia você quiser voltar a usar React, coloca algo aqui */}
      <></>
    </React.StrictMode>
  )
}
