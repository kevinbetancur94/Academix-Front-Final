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
  let respuesta
  try {
    respuesta = await fetch(`${API_URL}${ruta}`, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: body ? JSON.stringify(body) : undefined,
    })
  } catch {
    // fetch falla cuando el servidor está apagado o "dormido" y no responde
    throw new Error('No se pudo conectar con el servidor. Si es la primera vez del día, espera un minuto y vuelve a intentar.')
  }
  if (!respuesta.ok) {
    // El backend responde los errores como { "mensaje": "..." }: se muestra ese texto si viene
    let mensaje = `Error ${respuesta.status} al llamar a ${ruta}`
    try {
      const cuerpo = await respuesta.json()
      if (cuerpo?.mensaje) mensaje = cuerpo.mensaje
    } catch {
      // la respuesta no traía JSON: se deja el mensaje genérico
    }
    throw new Error(mensaje)
  }
  return respuesta.json()
}
