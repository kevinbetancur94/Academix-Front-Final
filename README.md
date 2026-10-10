# Academix-Front-Final

## Descripción
Academix es un proyecto web desarrollado con React y Vite, orientado a organizar y consultar información académica: notas del estudiante, panel docente, vistas para acudientes, calendario escolar y acceso por rol (login, registro y recuperación de contraseña).

## Rama de trabajo: `develop`
**Todo el código integrado del proyecto está en la rama `develop`.** Es la rama que debes clonar y usar para ejecutar la aplicación. La rama `main` queda reservada para la versión final (release), por lo que puede no incluir los últimos cambios.

```bash
git clone -b develop https://github.com/kevinbetancur94/Academix-Front-Final.git
```

## Tecnologías
- React 19
- JavaScript
- Vite
- React Router (`react-router-dom` 7, con `createBrowserRouter`)
- CSS (una hoja de estilos por página)
- ESLint

## Requisitos
- Node.js 20.19 o superior y npm instalados.
- Acceso al repositorio del proyecto.

## Instalación
1. Clona el repositorio (rama `develop`, ver arriba).
2. Ingresa a la carpeta del proyecto:

   ```bash
   cd Academix-Front-Final
   ```
3. Instala las dependencias:

   ```bash
   npm install
   ```

## Variables de entorno (opcional)
La aplicación funciona sin configuración: mientras no exista un backend usa datos de ejemplo (`src/data`). Para cambiar ese comportamiento, copia `.env.example` como `.env` y ajusta los valores:

| Variable | Valor por defecto | Descripción |
|---|---|---|
| `VITE_API_URL` | `http://localhost:3000/api` | URL base del backend. Es el único lugar donde se define (`src/config.js`). |
| `VITE_USAR_MOCK` | `true` | `true` usa datos de ejemplo; `false` hace peticiones reales a `VITE_API_URL`. |

El archivo `.env` no se sube a Git; `.env.example` sí.

## Ejecución
Inicia el servidor de desarrollo con:

```bash
npm run dev
```

Abre en el navegador la dirección que indique la terminal (normalmente `http://localhost:5173`).

## Validación
Para ejecutar las verificaciones de código:

```bash
npm run lint
npm run build
```

Si alguna verificación falla, revisa el mensaje mostrado en la terminal y los archivos pendientes de integración.

## Estructura del proyecto

```text
src/
├── components/   Componentes reutilizables (Navbar, LayoutApp, Encabezado, Cargando, MensajeError, NotaBadge)
├── pages/        Vistas principales (Inicio, Login, Registro, Recuperacion, VisualNotas, PanelDocente,
│                 AcudienteLista, DetalleHijo, Calendario, ErrorPage)
├── router/       Definición de rutas con createBrowserRouter
├── services/     Funciones que consumen el backend o los datos de ejemplo (api, auth, notas, hijos, calendario)
├── hooks/        Hooks personalizados (useCargarDatos)
├── utils/        Funciones de apoyo (cálculo de notas)
├── data/         Datos de ejemplo usados en modo mock
├── css/          Hojas de estilo, una por página o grupo de componentes
├── config.js     URL base de la API y modo de datos
└── main.jsx      Punto de entrada de la aplicación
```

Ninguna vista llama a `fetch` directamente: todo pasa por `src/services`.

## Rutas

| Ruta | Pantalla |
|---|---|
| `/` | Inicio |
| `/login` · `/registro` · `/recuperacion` | Acceso por rol |
| `/estudiante` | Notas del estudiante |
| `/docente` | Panel docente |
| `/acudiente` | Lista de estudiantes a cargo |
| `/acudiente/:hijoId` | Detalle de un estudiante (por ejemplo `/acudiente/juan`) |
| `/calendario` | Calendario escolar |
| `*` | Página de error 404 |

## Flujo de trabajo en Git
- Ramas: `main` (versión final), `develop` (integración) y `feature/*` o `fix/*` (una por tarea).
- Los mensajes de commit siguen Conventional Commits (`feat:`, `fix:`, `docs:`, `style:`, `chore:`).
- Los cambios se integran mediante Pull Request hacia `develop`.

## Contribución
Realiza los cambios en una rama independiente creada desde `develop` y envía un Pull Request hacia `develop` para su integración.

## Equipo
- Kevin: configuración del proyecto, portada, rutas y navegación.
- Nataly: vista del estudiante, panel docente y utilidades de notas.
- Karen: vistas del acudiente y documentación.
- Alex: autenticación (login, registro y recuperación) y calendario.
