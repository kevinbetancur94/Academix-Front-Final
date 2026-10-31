// Cuentas de ejemplo (mock): una por rol. Solo las importa authService.js.
// Estos mismos datos están documentados en el README para poder ingresar.
//
//   estudiante → estudiante@academix.com / Estudiante123
//   docente    → docente@academix.com    / Docente123
//   acudiente  → acudiente@academix.com  / Acudiente123

export const usuariosIniciales = [
  {
    id: 'estudiante-1',
    nombre: 'Juan Pérez',
    correo: 'estudiante@academix.com',
    password: 'Estudiante123',
    rol: 'estudiante',
    grado: '10',
    estudianteId: 'juan', // id del estudiante en data/hijos.js (de ahí salen sus notas)
  },
  {
    id: 'docente-1',
    nombre: 'Prof. Ana María García',
    correo: 'docente@academix.com',
    password: 'Docente123',
    rol: 'docente',
  },
  {
    id: 'acudiente-1',
    nombre: 'Carmen Pérez',
    correo: 'acudiente@academix.com',
    password: 'Acudiente123',
    rol: 'acudiente', // sus hijos son los de data/hijos.js con acudienteId: 'acudiente-1'
  },
]
