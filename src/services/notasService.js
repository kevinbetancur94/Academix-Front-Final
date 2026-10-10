// Servicios de notas: lista de estudiantes del docente y registro de una nota nueva.
import { USAR_MOCK } from '../config.js'
import { estudiantes } from '../data/estudiantes.js'
import { esNotaValida } from '../utils/notas.js'
import { peticion, simularRespuesta, simularError } from './api.js'

export function obtenerEstudiantes() {
  if (USAR_MOCK) return simularRespuesta(estudiantes)
  return peticion('/estudiantes')
}

// registro = { estudianteId, nota }
export function registrarNota(registro) {
  if (USAR_MOCK) {
    if (!esNotaValida(registro.nota)) {
      return simularError('La nota debe estar entre 1.0 y 5.0')
    }
    return simularRespuesta({ ok: true, ...registro })
  }
  return peticion('/notas', { method: 'POST', body: registro })
}