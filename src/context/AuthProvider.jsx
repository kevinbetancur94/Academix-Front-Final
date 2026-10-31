import { useState } from 'react'
import { AuthContext } from './authContext.js'
import { iniciarSesion } from '../services/authService.js'

const CLAVE = 'academix-sesion'

// Lee la sesión guardada (para no perderla al recargar la página).
function leerSesion() {
  try {
    return JSON.parse(sessionStorage.getItem(CLAVE))
  } catch {
    return null
  }
}

// Envuelve toda la app (ver main.jsx) y comparte: usuario, iniciar() y cerrar().
function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(leerSesion) // función = se ejecuta solo la primera vez

  // credenciales = { usuario, password, rol } → lanza error si son incorrectas
  async function iniciar(credenciales) {
    const encontrado = await iniciarSesion(credenciales)
    sessionStorage.setItem(CLAVE, JSON.stringify(encontrado))
    setUsuario(encontrado)
    return encontrado
  }

  function cerrar() {
    sessionStorage.removeItem(CLAVE)
    setUsuario(null)
  }

  return <AuthContext.Provider value={{ usuario, iniciar, cerrar }}>{children}</AuthContext.Provider>
}

export default AuthProvider
