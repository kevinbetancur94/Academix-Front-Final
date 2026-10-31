import { createContext } from 'react'

// Contexto = una "caja" que cualquier componente puede abrir para saber quién inició sesión,
// sin tener que pasar el usuario por props de página en página.
export const AuthContext = createContext(null)
