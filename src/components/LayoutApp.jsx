import { Navigate, Outlet } from 'react-router-dom'
import Navbar from './Navbar.jsx'
import { useAuth } from '../hooks/useAuth.js'

// Plantilla de las páginas internas: barra de navegación arriba y,
// debajo, la página que corresponda a la URL (<Outlet />).
// Si nadie ha iniciado sesión, manda al login (así el Navbar siempre sabe el rol).
function LayoutApp() {
  const { usuario } = useAuth()

  if (!usuario) return <Navigate to="/login" replace />

  return (
    <>
      <Navbar />
      <Outlet />
    </>
  )
}

export default LayoutApp
