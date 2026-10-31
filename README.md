# Academix

Aplicación web de gestión de notas para instituciones educativas, construida con **React + Vite** sobre el proyecto base `api-institucion`.

| Usuario | Qué hace | Ruta |
|---|---|---|
| Visitante | Conoce el producto, se registra, recupera contraseña, inicia sesión | `/`, `/registro`, `/recuperacion`, `/login` |
| Estudiante | Ve sus notas y promedio; consulta las tareas de su grado | `/estudiante`, `/calendario` |
| Docente | Registra y modifica notas y observaciones; programa tareas | `/docente`, `/calendario` |
| Acudiente | Ve las notas de sus hijos, alertas y tendencias | `/acudiente`, `/acudiente/:hijoId` |

> Es un *front-end*: los datos son de ejemplo (`src/data/`) y llegan por la capa de servicios. Lo que se escribe se pierde al recargar.

## Cuentas para ingresar

En `/login` elige el rol, escribe el correo y la contraseña y pulsa *Iniciar Sesión*. Cada cuenta solo funciona con **su** rol.

| Rol | Correo | Contraseña |
|---|---|---|
| Estudiante (Juan Pérez, 10°) | `estudiante@academix.com` | `Estudiante123` |
| Docente (Prof. Ana María García) | `docente@academix.com` | `Docente123` |
| Acudiente (Carmen Pérez) | `acudiente@academix.com` | `Acudiente123` |

También puedes crear una cuenta propia en `/registro`. En modo de ejemplo (sin backend) esa cuenta vive solo en memoria: se pierde al recargar la página, y una cuenta nueva empieza sin notas ni hijos.

## Qué puede hacer cada rol

Los roles **no se mezclan**: el menú muestra solo los enlaces del rol y, si alguien escribe en la barra del navegador la URL de otro rol, ve *Acceso denegado*. Sin sesión, cualquier página interna lleva al login.

| | Estudiante | Docente | Acudiente |
|---|---|---|---|
| Ver sus propias notas, promedio, materias en riesgo y tendencias (`/estudiante`) | ✅ | ❌ | ❌ |
| Registrar y modificar notas y observaciones, por materia y grupo (`/docente`) | ❌ | ✅ | ❌ |
| Ver la lista de sus hijos y el detalle con alertas (`/acudiente`) | ❌ | ❌ | ✅ (solo los suyos) |
| Ver el calendario de tareas (`/calendario`) | ✅ (solo las de su grado) | ✅ (todas, con filtro por grado) | ❌ |
| Programar tareas en el calendario | ❌ | ✅ | ❌ |

Notas válidas: de 1.0 a 5.0 (se aprueba con 3.0). El docente no puede guardar si hay una nota fuera de ese rango.

### Cómo probar que los roles están separados
1. Entra como **estudiante** y escribe en la barra `http://localhost:5173/docente` → *Acceso denegado*.
2. Entra como **docente**, cambia una nota, pulsa *Guardar calificaciones* y revisa la consola (F12).
3. Entra como **acudiente**, abre un hijo, e intenta `/acudiente/otro-id` → mensaje de error.
4. Pulsa **Salir** y vuelve a escribir una URL interna → te lleva al login.

## Tecnologías

React 19 · Vite · React Router (`createBrowserRouter`) · React Compiler · CSS

## Requisitos

Node.js 20.19 o superior.

## Instalación y ejecución

```bash
npm install     # solo la primera vez
npm run dev     # abre http://localhost:5173
```

Otros comandos: `npm run build` · `npm run preview` · `npm run lint`

## Variables de entorno

Copia `.env.example` como `.env` si necesitas cambiarlas:

| Variable | Para qué sirve |
|---|---|
| `VITE_API_URL` | URL base del backend |
| `VITE_USAR_MOCK` | `true` = datos de ejemplo · `false` = peticiones reales |

## Documentación

- [`src/README.md`](./src/README.md): estructura de carpetas y flujo de datos.
- [`GUIA.md`](./GUIA.md): qué es cada archivo y los conceptos de React usados.
- [`GUIA_EQUIPO.md`](./GUIA_EQUIPO.md): trabajo en equipo con Git (Gitflow, PRs, commits).

## Contribución

Trabaja en una rama `feature/...` o `fix/...` y abre un Pull Request hacia `develop`.
