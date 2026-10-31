// Datos de ejemplo del Panel Docente: las materias que dicta el profesor y,
// para cada una, los estudiantes con sus 3 notas (null = todavía sin nota).
// Solo los importa notasService.js.

export const materiasDocente = [
  { id: 'mat-10a', nombre: 'Matemáticas - 10° A' },
  { id: 'mat-10b', nombre: 'Matemáticas - 10° B' },
  { id: 'mat-11a', nombre: 'Matemáticas - 11° A' },
]

export const estudiantesPorMateria = {
  'mat-10a': [
    { id: 'e1', nombre: 'Juan Pérez', notas: [3.5, 4.0, 4.4], observacion: 'Va mejorando' },
    { id: 'e2', nombre: 'María Gómez', notas: [4.8, 4.6, 5.0], observacion: '' },
    { id: 'e3', nombre: 'Andrés Ríos', notas: [2.5, 2.8, null], observacion: 'Necesita refuerzo' },
    { id: 'e4', nombre: 'Laura Torres', notas: [3.9, 4.1, 4.0], observacion: '' },
  ],
  'mat-10b': [
    { id: 'e5', nombre: 'Camilo Duque', notas: [3.0, 3.2, 3.1], observacion: '' },
    { id: 'e6', nombre: 'Valentina Ospina', notas: [4.5, 4.4, 4.7], observacion: 'Excelente participación' },
    { id: 'e7', nombre: 'Santiago Mejía', notas: [2.9, null, null], observacion: '' },
  ],
  'mat-11a': [
    { id: 'e8', nombre: 'Daniela Cano', notas: [4.2, 4.0, 4.3], observacion: '' },
    { id: 'e9', nombre: 'Felipe Agudelo', notas: [3.4, 3.6, 3.5], observacion: '' },
  ],
}
