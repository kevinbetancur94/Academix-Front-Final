import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import './index.css'
import { router } from './router/index.jsx'
import AuthProvider from './context/AuthProvider.jsx'

// AuthProvider comparte la sesión (quién inició sesión y con qué rol) con toda la app.
// RouterProvider le entrega a toda la app el sistema de rutas definido en src/router.
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
)
