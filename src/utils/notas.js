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