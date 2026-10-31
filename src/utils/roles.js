// Qué puede ver y hacer cada rol. Es la ÚNICA tabla de permisos de la app:
// el Navbar muestra estos enlaces y el router (RutaProtegida) usa los mismos roles.

export const ROLES = ['estudiante', 'docente', 'acudiente']

export const NOMBRE_ROL = {
  estudiante: 'Estudiante',
  docente: 'Docente',
  acudiente: 'Acudiente',
}

// Página a la que va cada rol después de iniciar sesión
export const RUTA_INICIO = {
  estudiante: '/estudiante',
  docente: '/docente',
  acudiente: '/acudiente',
}

// Enlaces del menú de cada rol (además de "Inicio" y "Salir", que son para todos)
export const ENLACES_POR_ROL = {
  estudiante: [
    { to: '/estudiante', texto: 'Mis Notas' },
    { to: '/calendario', texto: 'Calendario' },
  ],
  docente: [
    { to: '/docente', texto: 'Panel Docente' },
    { to: '/calendario', texto: 'Calendario' },
  ],
  acudiente: [{ to: '/acudiente', texto: 'Mis Hijos' }],
}
