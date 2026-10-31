// Datos de ejemplo de los estudiantes (mock). Solo los importan los servicios.
// "Juan" también es el estudiante que ve la página "Mis Notas".
// acudienteId = a qué acudiente pertenece cada hijo (cada acudiente solo ve a los suyos).
// Escala colombiana: de 1.0 a 5.0, se gana con 3.0

export const hijos = [
  {
    id: 'juan',
    acudienteId: 'acudiente-1',
    nombre: 'Juan Pérez',
    grado: '10° A',
    materias: [
      { nombre: 'Matemáticas', notas: [3.5, 4.0, 4.4] },
      { nombre: 'Español', notas: [4.2, 4.5, 4.3] },
      { nombre: 'Ciencias', notas: [3.8, 3.6, 3.9] },
      { nombre: 'Inglés', notas: [4.8, 4.6, 5.0] },
      { nombre: 'Historia', notas: [3.2, 3.2, 3.3] },
      { nombre: 'Educación Física', notas: [4.5, 4.7, 4.6] },
    ],
  },
  {
    id: 'sofia',
    acudienteId: 'acudiente-1',
    nombre: 'Sofía Pérez',
    grado: '7° B',
    materias: [
      { nombre: 'Matemáticas', notas: [4.6, 4.8, 4.9] },
      { nombre: 'Español', notas: [4.0, 4.2, 4.1] },
      { nombre: 'Ciencias', notas: [4.4, 4.5, 4.7] },
      { nombre: 'Inglés', notas: [3.9, 4.1, 4.3] },
      { nombre: 'Historia', notas: [4.0, 3.8, 3.7] },
      { nombre: 'Arte', notas: [5.0, 4.9, 5.0] },
    ],
  },
  {
    id: 'carlos',
    acudienteId: 'acudiente-1',
    nombre: 'Carlos Pérez',
    grado: '4° C',
    materias: [
      { nombre: 'Matemáticas', notas: [3.4, 2.8, 2.4] },
      { nombre: 'Español', notas: [3.6, 3.4, 3.5] },
      { nombre: 'Ciencias', notas: [2.6, 2.9, 2.7] },
      { nombre: 'Inglés', notas: [3.3, 3.8, 4.1] },
      { nombre: 'Sociales', notas: [3.1, 3.0, 3.2] },
      { nombre: 'Educación Física', notas: [4.2, 4.4, 4.5] },
    ],
  },
]
