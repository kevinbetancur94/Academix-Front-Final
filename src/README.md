# Documentación del código fuente de Academix (`src/`)

Academix está montado sobre el proyecto base **api-institucion** (React + Vite con React Compiler) y sigue la misma forma de trabajo: una sola página `index.html`, el código dentro de `src/` y cada tipo de archivo en su carpeta.

## 1. Estructura de carpetas

```
src/
├── main.jsx            ← Punto de entrada: arranca React con <RouterProvider />
├── config.js           ← ÚNICO lugar con la URL de la API y el modo mock
├── index.css           ← Estilos globales mínimos
├── router/index.jsx    ← Mapa de rutas (createBrowserRouter) con rutas protegidas por rol
├── context/            ← Sesión compartida: AuthProvider (quién inició sesión y con qué rol)
├── pages/              ← Pantallas completas (una por ruta)
├── components/         ← Piezas reutilizables
├── services/           ← Acceso a datos: aquí viven los fetch (api.js)
├── hooks/              ← Hooks personalizados (useCargarDatos)
├── data/               ← Datos de ejemplo (mock) mientras no hay backend
├── utils/              ← Cálculos sin nada visual (promedio, tendencia, riesgo)
└── css/                ← Un archivo de estilos por página o componente
```

**Regla fácil:**

| Si es... | Va en... |
|---|---|
| Una pantalla con su propia URL | `pages/` |
| Una pieza usada en varias pantallas | `components/` |
| Algo que habla con el backend (o con los datos de ejemplo) | `services/` |
| Lógica de React reutilizable (empieza con `use`) | `hooks/` |
| Un cálculo sin nada visual | `utils/` |
| Información de ejemplo | `data/` |

## 2. Archivos por carpeta

| Carpeta | Archivos |
|---|---|
| `pages/` | `Inicio`, `Login`, `Registro`, `Recuperacion`, `VisualNotas`, `PanelDocente`, `AcudienteLista`, `DetalleHijo`, `Calendario`, `ErrorPage` |
| `components/` | `Encabezado`, `NotaBadge`, `Navbar`, `LayoutApp`, `RutaProtegida`, `AccesoDenegado`, `Cargando`, `MensajeError` |
| `services/` | `api.js`, `authService.js`, `hijosService.js`, `notasService.js`, `calendarioService.js` |
| `context/` | `authContext.js`, `AuthProvider.jsx` |
| `hooks/` | `useCargarDatos.js`, `useAuth.js` |
| `utils/` | `notas.js`, `roles.js` |
| `data/` | `usuarios.js`, `hijos.js`, `estudiantes.js`, `calendario.js` |

## 3. Navegación

| URL | Página | ¿Con Navbar? | Quién entra |
|---|---|---|---|
| `/` | Inicio | No | Todos |
| `/login`, `/registro`, `/recuperacion` | Formularios de acceso | No | Todos |
| `/estudiante` | VisualNotas | Sí | Solo estudiante |
| `/docente` | PanelDocente | Sí | Solo docente |
| `/acudiente` | AcudienteLista | Sí | Solo acudiente |
| `/acudiente/:hijoId` | DetalleHijo (página de detalle) | Sí | Solo acudiente (y solo sus hijos) |
| `/calendario` | Calendario | Sí | Estudiante y docente |
| cualquier otra | ErrorPage (404) | No | Todos |

### Sesión y roles

- `context/AuthProvider.jsx` guarda quién inició sesión (en `sessionStorage`, así sobrevive a recargar) y lo comparte con `useAuth()`.
- `components/RutaProtegida.jsx` envuelve cada grupo de rutas en `router/index.jsx` y recibe los roles permitidos: sin sesión → login; rol no permitido → `AccesoDenegado`.
- `utils/roles.js` es la única tabla de permisos: de ahí salen los enlaces del `Navbar` y la página de inicio de cada rol.
- Cada página pide solo los datos del usuario: `VisualNotas` usa `usuario.estudianteId`, `AcudienteLista` usa `usuario.id` y `DetalleHijo` verifica que el hijo sea de ese acudiente.
- Las cuentas de ejemplo están en `data/usuarios.js` (y en el README de la raíz).

## 4. Flujo de datos

```
data/hijos.js → services/hijosService.js → hooks/useCargarDatos.js → pages/DetalleHijo.jsx → pantalla
 (datos mock)    (simula/consulta la API)    (cargando / error / datos)   (usa utils/notas.js y components/)
```

Ningún componente llama a `fetch`: solo `services/api.js`. Para conectar un backend real basta con poner `VITE_USAR_MOCK=false` en `.env`.

## 5. Estilos

Todos los CSS se cargan globalmente, así que cada página se envuelve en un `<div>` con su propia clase (`pg-login`, `pg-docente`, `pg-acudiente`...) y **todos sus selectores empiezan con ese prefijo**. Los componentes compartidos usan el prefijo `ui-`.

## 6. Escala de notas

Escala colombiana de 1.0 a 5.0; se gana con 3.0 (`NOTA_APROBATORIA`). Una materia está **en riesgo** si su promedio es menor a 3.0. Las constantes están al inicio de `utils/notas.js`.

## 7. Buenas prácticas

- Un componente, una responsabilidad.
- No escribir URLs ni `fetch` fuera de `config.js` y `services/api.js`.
- Antes de hacer commit: `npm run lint`.
