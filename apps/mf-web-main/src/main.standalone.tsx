import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import { createRoot } from 'react-dom/client'

console.log('mf-main React version', (React as any).version)

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
)
