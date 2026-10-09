// Funciones base que usan TODOS los servicios.
// Aquí (y solo aquí) vive el fetch. Los componentes nunca llaman a fetch directamente.
import { API_URL, RETARDO_MOCK } from '../config.js'

// Simula la respuesta de un servidor: devuelve los datos después de una pequeña espera.
// Devuelve una COPIA (structuredClone) para que nadie modifique los datos originales.
export function simularRespuesta(datos, ms = RETARDO_MOCK) {
  return new Promise((resolver) => {
    setTimeout(() => resolver(structuredClone(datos)), ms)
  })
}

// Simula un error del servidor.
export function simularError(mensaje, ms = RETARDO_MOCK) {
  return new Promise((_, rechazar) => {
    setTimeout(() => rechazar(new Error(mensaje)), ms)
  })
}

// Petición real al backend. Ejemplo: peticion('/hijos') o peticion('/login', { method: 'POST', body: {...} })
export async function peticion(ruta, { method = 'GET', body } = {}) {
  const respuesta = await fetch(`${API_URL}${ruta}`, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: body ? JSON.stringify(body) : undefined,
  })
  if (!respuesta.ok) {
    throw new Error(`Error ${respuesta.status} al llamar a ${ruta}`)
  }
  return respuesta.json()
}
