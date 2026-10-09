// Servicios del calendario escolar: tareas y festivos.
import { USAR_MOCK } from '../config.js'
import { tareasIniciales, festivos } from '../data/calendario.js'
import { peticion, simularRespuesta } from './api.js'

export function obtenerTareas() {
  if (USAR_MOCK) return simularRespuesta(tareasIniciales)
  return peticion('/tareas')
}

export function obtenerFestivos() {
  if (USAR_MOCK) return simularRespuesta(festivos)
  return peticion('/festivos')
}

// Crea una tarea y devuelve la tarea ya con su id (el backend real asignaría el id).
export function crearTarea(tarea) {
  if (USAR_MOCK) return simularRespuesta({ ...tarea, id: Date.now() })
  return peticion('/tareas', { method: 'POST', body: tarea })
}
