// Servicios del Panel Docente: materias, estudiantes y guardado de calificaciones.
import { USAR_MOCK } from '../config.js'
import { materiasDocente, estudiantesPorMateria } from '../data/estudiantes.js'
import { peticion, simularRespuesta, simularError } from './api.js'

// docenteId = usuario.id del docente que inició sesión
export function obtenerMateriasDocente(docenteId) {
  if (USAR_MOCK) return simularRespuesta(materiasDocente)
  return peticion(`/docentes/${docenteId}/materias`)
}

// materiaId = 'mat-10a'... Devuelve los estudiantes de esa materia con sus notas.
export function obtenerEstudiantesDocente(materiaId) {
  if (USAR_MOCK) {
    const estudiantes = estudiantesPorMateria[materiaId]
    if (!estudiantes) return simularError('No encontramos esa materia.')
    return simularRespuesta(estudiantes)
  }
  return peticion(`/docente/materias/${materiaId}/estudiantes`)
}

// datos = { materiaId, calificaciones: [{ id, notas: [..], observacion }] }
export function guardarCalificaciones(datos) {
  if (USAR_MOCK) return simularRespuesta({ ok: true, guardados: datos.calificaciones.length })
  return peticion('/docente/calificaciones', { method: 'PUT', body: datos })
}
