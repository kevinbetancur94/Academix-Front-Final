import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth.js'
import AccesoDenegado from './AccesoDenegado.jsx'

// Protege un grupo de rutas (ver router/index.jsx):
//  - sin sesión            → manda al login
//  - con un rol no permitido → muestra "Acceso denegado"
//  - rol permitido         → dibuja la página (<Outlet />)
function RutaProtegida({ roles }) {
  const { usuario } = useAuth()

  if (!usuario) return <Navigate to="/login" replace />
  if (!roles.includes(usuario.rol)) return <AccesoDenegado />
  return <Outlet />
}

export default RutaProtegida
