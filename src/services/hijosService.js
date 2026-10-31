// Servicios de los estudiantes: notas del estudiante y hijos del acudiente.
import { USAR_MOCK } from '../config.js'
import { hijos } from '../data/hijos.js'
import { peticion, simularRespuesta, simularError } from './api.js'

// Notas del estudiante que inició sesión. Si su cuenta todavía no tiene notas devuelve null.
export function obtenerMisNotas(estudianteId) {
  if (USAR_MOCK) {
    if (!estudianteId) return simularRespuesta(null)
    const estudiante = hijos.find((h) => h.id === estudianteId)
    return simularRespuesta(estudiante ?? null)
  }
  return peticion('/estudiante/notas')
}

// Hijos de UN acudiente (cada acudiente solo recibe a los suyos).
export function obtenerHijos(acudienteId) {
  if (USAR_MOCK) return simularRespuesta(hijos.filter((h) => h.acudienteId === acudienteId))
  return peticion(`/acudientes/${acudienteId}/hijos`)
}

// id = 'juan', 'sofia'... (el mismo que aparece en la URL /acudiente/:hijoId)
export function obtenerHijo(id) {
  if (USAR_MOCK) {
    const hijo = hijos.find((h) => h.id === id)
    if (!hijo) return simularError('No encontramos información para este estudiante.')
    return simularRespuesta(hijo)
  }
  return peticion(`/hijos/${id}`)
}
