// Servicios de los hijos del acudiente: la lista completa y el detalle de uno.
import { USAR_MOCK } from '../config.js'
import { hijos } from '../data/hijos.js'
import { peticion, simularRespuesta, simularError } from './api.js'

export function obtenerHijos() {
  if (USAR_MOCK) return simularRespuesta(hijos)
  return peticion('/hijos')
}

// id = el que viene en la URL, por ejemplo /acudiente/juan → 'juan'
export function obtenerHijo(id) {
  if (USAR_MOCK) {
    const hijo = hijos.find((h) => h.id === id)
    if (!hijo) return simularError('No encontramos a este estudiante')
    return simularRespuesta(hijo)
  }
  return peticion(`/hijos/${id}`)
}