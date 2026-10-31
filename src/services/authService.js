// Servicios de autenticación: iniciar sesión, registrarse y recuperar contraseña.
import { USAR_MOCK } from '../config.js'
import { usuariosIniciales } from '../data/usuarios.js'
import { NOMBRE_ROL } from '../utils/roles.js'
import { peticion, simularRespuesta, simularError } from './api.js'

// En modo mock las cuentas viven en memoria: las de ejemplo + las que se registren
// (se pierden al recargar la página, igual que cualquier dato sin backend).
const cuentas = structuredClone(usuariosIniciales)

// Nunca se le devuelve la contraseña a la aplicación.
function sinPassword(cuenta) {
  const { password, ...usuario } = cuenta // eslint-disable-line no-unused-vars
  return usuario
}

// credenciales = { usuario (correo), password, rol }
export function iniciarSesion(credenciales) {
  if (USAR_MOCK) {
    const correo = credenciales.usuario.trim().toLowerCase()
    const cuenta = cuentas.find((c) => c.correo.toLowerCase() === correo && c.password === credenciales.password)
    if (!cuenta) return simularError('Correo o contraseña incorrectos')
    // Cada cuenta tiene UN rol: no se puede entrar con el rol de otra persona.
    if (cuenta.rol !== credenciales.rol) {
      return simularError(`Esta cuenta es de ${NOMBRE_ROL[cuenta.rol]}. Selecciona el rol correcto.`)
    }
    return simularRespuesta(sinPassword(cuenta))
  }
  return peticion('/auth/login', { method: 'POST', body: credenciales })
}

// datos = el objeto completo del formulario de registro
export function registrarUsuario(datos) {
  if (USAR_MOCK) {
    const correo = datos.correo.trim().toLowerCase()
    if (cuentas.some((c) => c.correo.toLowerCase() === correo)) {
      return simularError('Ese correo ya está registrado')
    }
    cuentas.push({
      id: `${datos.rol}-${Date.now()}`,
      nombre: datos.nombre,
      correo,
      password: datos.password,
      rol: datos.rol,
      grado: datos.rol === 'estudiante' ? datos.grado : undefined,
      estudianteId: null, // una cuenta nueva todavía no tiene notas
    })
    return simularRespuesta({ ok: true, usuario: datos.nombre })
  }
  return peticion('/auth/registro', { method: 'POST', body: datos })
}

export function recuperarPassword(email) {
  if (USAR_MOCK) return simularRespuesta({ ok: true })
  return peticion('/auth/recuperar', { method: 'POST', body: { email } })
}
