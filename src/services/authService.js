// Servicios de autenticación: iniciar sesión, registrarse y recuperar contraseña.
import { USAR_MOCK } from '../config.js'
import { peticion, simularRespuesta, simularError } from './api.js'

// credenciales = { usuario, password, rol }
export function iniciarSesion(credenciales) {
  if (USAR_MOCK) {
    // Sin backend: cualquier usuario y contraseña con datos "entra".
    if (!credenciales.usuario || !credenciales.password) {
      return simularError('Usuario o contraseña incorrectos')
    }
    return simularRespuesta({ usuario: credenciales.usuario, rol: credenciales.rol })
  }
  return peticion('/auth/login', { method: 'POST', body: credenciales })
}

// datos = el objeto completo del formulario de registro
export function registrarUsuario(datos) {
  if (USAR_MOCK) return simularRespuesta({ ok: true, usuario: datos.nombre })
  return peticion('/auth/registro', { method: 'POST', body: datos })
}

export function recuperarPassword(email) {
  if (USAR_MOCK) return simularRespuesta({ ok: true })
  return peticion('/auth/recuperar', { method: 'POST', body: { email } })
}
