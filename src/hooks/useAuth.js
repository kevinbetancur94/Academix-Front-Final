import { useContext } from 'react'
import { AuthContext } from '../context/authContext.js'

// Hook para saber quién inició sesión:  const { usuario, iniciar, cerrar } = useAuth()
// usuario es null si nadie ha iniciado sesión.
export function useAuth() {
  return useContext(AuthContext)
}
