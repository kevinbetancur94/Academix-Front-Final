// Datos de ejemplo del calendario escolar.

export const materias = ['Matemáticas', 'Ciencias', 'Historia', 'Literatura', 'Inglés', 'Física', 'Química', 'Arte', 'Educación Física', 'Tecnología']
export const tipos = ['Tarea', 'Proyecto', 'Examen', 'Presentación', 'Investigación', 'Exposición', 'Laboratorio', 'Quiz']
export const grados = ['6', '7', '8', '9', '10', '11']

// Fecha en formato 'AAAA-MM-DD' (así la entrega el <input type="date">)
export const tareasIniciales = [
  { id: 1, titulo: 'Taller de ecuaciones', descripcion: 'Resolver los ejercicios 1 al 15 del libro.', materia: 'Matemáticas', tipo: 'Tarea', grado: '10', fecha: '2025-10-16', observaciones: '' },
  { id: 2, titulo: 'Examen de la Revolución Industrial', descripcion: 'Capítulos 4 y 5.', materia: 'Historia', tipo: 'Examen', grado: '10', fecha: '2025-10-20', observaciones: 'Traer lápiz y borrador' },
  { id: 3, titulo: 'Laboratorio de reacciones', descripcion: 'Informe del laboratorio.', materia: 'Química', tipo: 'Laboratorio', grado: '11', fecha: '2025-10-22', observaciones: '' },
  { id: 4, titulo: 'Exposición sobre el medio ambiente', descripcion: 'Grupos de 3 personas.', materia: 'Ciencias', tipo: 'Exposición', grado: '8', fecha: '2025-10-24', observaciones: '' },
  { id: 5, titulo: 'Quiz de vocabulario', descripcion: 'Unidad 6.', materia: 'Inglés', tipo: 'Quiz', grado: '10', fecha: '2025-10-28', observaciones: '' },
]

// Festivos de Colombia 2025 (fecha 'AAAA-MM-DD')
export const festivos = [
  { fecha: '2025-01-01', nombre: 'Año Nuevo' },
  { fecha: '2025-01-06', nombre: 'Reyes Magos' },
  { fecha: '2025-03-24', nombre: 'San José' },
  { fecha: '2025-04-17', nombre: 'Jueves Santo' },
  { fecha: '2025-04-18', nombre: 'Viernes Santo' },
  { fecha: '2025-05-01', nombre: 'Día del Trabajo' },
  { fecha: '2025-06-02', nombre: 'Ascensión del Señor' },
  { fecha: '2025-06-23', nombre: 'Corpus Christi' },
  { fecha: '2025-06-30', nombre: 'Sagrado Corazón' },
  { fecha: '2025-07-20', nombre: 'Día de la Independencia' },
  { fecha: '2025-08-07', nombre: 'Batalla de Boyacá' },
  { fecha: '2025-08-18', nombre: 'Asunción de la Virgen' },
  { fecha: '2025-10-13', nombre: 'Día de la Raza' },
  { fecha: '2025-11-03', nombre: 'Todos los Santos' },
  { fecha: '2025-11-17', nombre: 'Independencia de Cartagena' },
  { fecha: '2025-12-08', nombre: 'Inmaculada Concepción' },
  { fecha: '2025-12-25', nombre: 'Navidad' },
]
