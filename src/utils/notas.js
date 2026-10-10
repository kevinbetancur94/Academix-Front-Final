// Funciones para calcular notas. Escala colombiana: de 1.0 a 5.0, se gana con 3.0

// Constantes: valores fijos que usamos en todo el archivo
export const NOTA_MINIMA = 1.0
export const NOTA_MAXIMA = 5.0
export const NOTA_APROBATORIA = 3.0

// Deja un número con un solo decimal. Ej: 3.456 → 3.5
export function redondear(numero) {
  return Math.round(numero * 10) / 10
}

// Promedio de una lista de notas. Ej: [3, 4, 5] → 4
export function calcularPromedio(notas) {
  if (!notas || notas.length === 0) return 0
  const suma = notas.reduce((total, nota) => total + nota, 0)
  return redondear(suma / notas.length)
}

// ¿La nota está entre 1.0 y 5.0?
export function esNotaValida(nota) {
  return typeof nota === 'number' && nota >= NOTA_MINIMA && nota <= NOTA_MAXIMA
}

// Color según la nota: verde (bien), amarillo (aprobó justo), rojo (perdió)
export function nivelColor(nota) {
  if (nota >= 4.0) return 'verde'
  if (nota >= NOTA_APROBATORIA) return 'amarillo'
  return 'rojo'
}

// Compara la primera y la última nota para saber si el estudiante va mejorando
export function calcularTendencia(notas) {
  if (!notas || notas.length < 2) return 'estable'
  const diferencia = notas[notas.length - 1] - notas[0]
  if (diferencia > 0.2) return 'sube'
  if (diferencia < -0.2) return 'baja'
  return 'estable'
}

// Recibe las materias de un estudiante, por ejemplo:
// [{ nombre: 'Matemáticas', notas: [2.5, 2.8] }, { nombre: 'Español', notas: [4.5, 4] }]
// y devuelve su promedio general y las materias que va perdiendo
export function resumenEstudiante(materias) {
  const promedios = materias.map((m) => calcularPromedio(m.notas))
  const promedioGeneral = calcularPromedio(promedios)
  const materiasEnRiesgo = materias
    .filter((m) => calcularPromedio(m.notas) < NOTA_APROBATORIA)
    .map((m) => m.nombre)

  return {
    promedioGeneral,
    color: nivelColor(promedioGeneral),
    materiasEnRiesgo,
    enRiesgo: materiasEnRiesgo.length > 0,
  }
}