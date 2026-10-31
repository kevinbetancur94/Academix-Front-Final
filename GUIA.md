# Guía de Academix (versión React + Vite)

Esta guía explica **qué es cada archivo, para qué sirve y cómo se conectan entre sí**, para que cualquiera del equipo pueda entender el proyecto y seguir trabajando en él.

---

## 1. ¿Qué es Academix?

Una aplicación web de gestión de notas para instituciones educativas, con varios tipos de usuario:

| Quién | Qué hace | Página |
|---|---|---|
| Cualquier visitante | Conoce el producto | Inicio |
| Cualquier visitante | Crea cuenta / recupera contraseña / inicia sesión | Registro, Recuperación, Login |
| Estudiante | Ve sus notas y su promedio | Mis Notas |
| Docente | Registra notas y observaciones | Panel Docente |
| Acudiente | Ve las notas de sus hijos, alertas y tendencias | Acudientes |
| Estudiante / Docente | El estudiante consulta las tareas de su grado; el docente también las programa | Calendario |

**Importante:** esta versión es un *front-end* (solo lo que se ve en el navegador). Todavía no hay base de datos ni servidor: los datos son de ejemplo (`src/data/`) y llegan a las pantallas a través de la capa de servicios, que más adelante hablará con el backend real. Lo que el usuario escribe se pierde al recargar la página (la rúbrica no pide guardarlo).

---

## 2. ¿Qué cambió respecto a la versión anterior (HTML puro)?

| Antes (HTML + CSS + JS suelto) | Ahora (React + Vite) |
|---|---|
| 8 archivos `.html`, uno por página | 1 sola página real (`index.html`) y componentes de React |
| Navegar = abrir otro archivo | Navegar = cambiar de ruta sin recargar (`createBrowserRouter`) |
| Datos escritos a mano dentro del HTML | Datos en `src/data/`, que solo los **servicios** leen |
| Promedios escritos a mano (`4.5`) | Promedios **calculados** automáticamente |
| Lo mismo copiado en varias páginas | Componentes reutilizables (`Encabezado`, `Navbar`, `NotaBadge`...) |
| Sin carga ni errores | Spinner mientras cargan los datos y mensajes de error claros |
| Cada página con su `<script>` | Hooks (`useState`, `useEffect`) dentro de cada componente |

---

## 3. Cómo ejecutarlo

Necesitas tener **Node.js** instalado (versión 20.19 o superior).

```bash
npm install     # descarga las dependencias (solo la primera vez)
npm run dev     # inicia el servidor de desarrollo
```

La terminal muestra una dirección (normalmente `http://localhost:5173`). Ábrela en el navegador. Los cambios que guardes en el código se ven al instante.

Otros comandos:

- `npm run build`: genera la versión final optimizada en la carpeta `dist/`.
- `npm run preview`: prueba esa versión final.
- `npm run lint`: revisa el código en busca de errores y malas prácticas.

---

## 4. Estructura de carpetas

```
api-institucion/   (proyecto base con Academix montado)
├── index.html              ← Única página HTML. Solo tiene <div id="root">
├── package.json            ← Dependencias y comandos (npm run ...)
├── vite.config.js          ← Configuración de Vite
├── eslint.config.js        ← Reglas del linter
├── .env.example            ← Plantilla de variables de entorno (URL de la API)
├── .gitignore              ← Archivos que Git no sube (node_modules, dist, .env)
├── public/                 ← Archivos estáticos (logo, video). Se usan con "/nombre.jpg"
└── src/
    ├── README.md           ← Documentación de esta estructura (HU-01)
    ├── main.jsx            ← Punto de entrada: arranca React y el router
    ├── config.js           ← ÚNICO lugar con la URL base de la API
    ├── index.css           ← Estilos globales mínimos
    ├── router/index.jsx    ← Mapa de rutas con createBrowserRouter
    ├── pages/              ← Pantallas completas (una por ruta)
    ├── components/         ← Piezas reutilizables
    ├── services/           ← Acceso a datos: aquí viven los fetch
    ├── context/            ← Sesión compartida (AuthProvider)
    ├── hooks/              ← Hooks personalizados (useCargarDatos, useAuth)
    ├── data/               ← Datos de ejemplo (mock) mientras no hay backend
    ├── utils/              ← Cálculo de notas (notas.js) y permisos por rol (roles.js)
    └── css/                ← Un archivo de estilos por página o componente
```

**Regla fácil para recordar:**
- ¿Es una pantalla con su propia URL? → `pages/`
- ¿Es una pieza que se usa en varias pantallas? → `components/`
- ¿Habla con el backend (o con los datos de ejemplo)? → `services/`
- ¿Es lógica de React reutilizable (empieza con `use`)? → `hooks/`
- ¿Es un cálculo sin nada visual? → `utils/`
- ¿Es información de ejemplo? → `data/`

---

## 5. Conceptos de React que usamos

### 5.1 Componente
Una **función que devuelve lo que se ve en pantalla**. Su nombre empieza con mayúscula.

```jsx
function Saludo() {
  return <h1>Hola</h1>
}
```

### 5.2 JSX
Es HTML escrito dentro de JavaScript. Diferencias con HTML normal:

| HTML | JSX |
|---|---|
| `class="x"` | `className="x"` |
| `for="x"` | `htmlFor="x"` |
| `<img src="a.jpg">` | `<img src="a.jpg" />` (toda etiqueta debe cerrarse) |
| `style="color: red"` | `style={{ color: 'red' }}` |
| `onclick="f()"` | `onClick={f}` |
| (no existe) | `{variable}` para mostrar un valor de JavaScript |

### 5.3 Props
Los **datos que un componente recibe desde afuera**, como los parámetros de una función.

```jsx
<Encabezado nombre="Prof. Ana María García" rol="Docente" />
```
```jsx
function Encabezado({ nombre, rol }) { ... }
```

### 5.4 Estado (`useState`)
La **memoria de un componente**. Cuando el estado cambia, React vuelve a dibujar la pantalla.

```jsx
const [email, setEmail] = useState('')
//     ↑ valor   ↑ función para cambiarlo      ↑ valor inicial
```

Regla de oro: **nunca modifiques el estado directamente**; siempre usa la función `setX`. Para listas u objetos, crea una copia nueva (`{ ...objeto }`, `.map()`, `[...lista, nuevo]`).

### 5.5 Formularios controlados
Cada campo está "conectado" al estado: muestra `value={estado}` y al escribir actualiza con `onChange`. Así React siempre sabe qué hay escrito. Se ve en `Login.jsx`, `Registro.jsx` y `PanelDocente.jsx`.

### 5.6 Renderizado condicional
Mostrar algo solo si se cumple una condición:

```jsx
{error && <p>{error}</p>}                // se muestra solo si error tiene texto
{usuario ? <Panel /> : <Bienvenida />}   // uno u otro
```

### 5.7 Listas con `.map()` y `key`
En vez de copiar 6 filas de tabla a mano, recorremos los datos:

```jsx
{materias.map((m) => (
  <tr key={m.materia}>...</tr>
))}
```
`key` debe ser un valor único por elemento; React lo usa para saber qué fila cambió.

### 5.8 Rutas (`react-router-dom` v6.4+ / v7)
Usamos la **API moderna basada en objetos** (en `src/router/index.jsx`):

```jsx
export const router = createBrowserRouter([
  { path: '/', element: <Inicio /> },
  { path: '/acudiente/:hijoId', element: <DetalleHijo /> },   // :hijoId = parámetro de la URL
  { path: '*', element: <ErrorPage /> },                       // cualquier otra URL = 404
])
```
y en `main.jsx` se entrega con `<RouterProvider router={router} />`.

- `<Link to="/login">` y `<NavLink>` reemplazan al `<a href>`; cambian de página sin recargar. `NavLink` agrega la clase `active` al enlace de la página actual (se usa en el `Navbar`).
- `useNavigate()` cambia de página desde el código (después de iniciar sesión).
- `useParams()` lee parámetros de la URL (en `DetalleHijo`, el `:hijoId`).
- Rutas **anidadas** + `<Outlet />`: `LayoutApp` pone el `Navbar` arriba y dibuja debajo la página hija.
- `errorElement` muestra `ErrorPage` cuando algo falla; el 404 es la ruta `*`.

### 5.9 Efectos (`useEffect`) y hooks personalizados
`useEffect` ejecuta código **cuando el componente aparece o cuando cambia algo**. Lo usamos para pedir datos:

```jsx
useEffect(() => {
  cargar(argumento).then(...)      // pide los datos
  return () => { activo = false }  // limpieza al salir de la página
}, [cargar, argumento])            // se vuelve a ejecutar si esto cambia
```
Para no repetir ese bloque en cada página lo guardamos en un **hook personalizado**, `src/hooks/useCargarDatos.js`:

```jsx
const { datos, cargando, error } = useCargarDatos(obtenerHijo, 'juan')
if (cargando) return <Cargando />
if (error) return <MensajeError mensaje={error} />
```

### 5.10 Capa de servicios
**Regla de la rúbrica:** ningún componente llama a `fetch` o `axios`. Los componentes llaman a funciones de `src/services/`, y estas hablan con el backend. Así, si una ruta del backend cambia, se corrige en un solo archivo.

---

## 6. Explicación archivo por archivo

### Configuración

- **`index.html`**: la única página HTML. Tiene un `<div id="root">` donde React dibuja todo.
- **`package.json`**: dependencias (`react`, `react-dom`, `react-router-dom`) y comandos.
- **`.env.example`**: plantilla de variables de entorno. Se copia como `.env` para cambiar la URL de la API.
- **`src/config.js`**: define `API_URL` (URL base del backend) y `USAR_MOCK` (`true` = datos de ejemplo). **Es el único lugar donde se escribe la URL.** Pasar a producción = cambiar `VITE_API_URL` en `.env`.
- **`src/main.jsx`**: arranca React con `<RouterProvider router={router} />`.
- **`src/router/index.jsx`**: el mapa de la app.

| URL | Página | ¿Con Navbar? |
|---|---|---|
| `/` | Inicio | No |
| `/login`, `/registro`, `/recuperacion` | Formularios de acceso | No |
| `/estudiante` | VisualNotas | Sí (solo estudiante) |
| `/docente` | PanelDocente | Sí (solo docente) |
| `/acudiente` | AcudienteLista | Sí (solo acudiente) |
| `/acudiente/:hijoId` | DetalleHijo (página de **detalle**) | Sí (solo acudiente, solo sus hijos) |
| `/calendario` | Calendario | Sí (estudiante y docente) |
| cualquier otra | ErrorPage (**404**) | No |

### Sesión y roles (`context/`, `hooks/useAuth.js`, `components/RutaProtegida.jsx`, `utils/roles.js`)

La app sabe quién inició sesión gracias a un **contexto de React**: `AuthProvider` (en `main.jsx`) guarda el usuario y `useAuth()` lo entrega a cualquier componente. Tres piezas hacen que los roles no se mezclen:

1. **`RutaProtegida`** envuelve cada grupo de rutas en el router y recibe los roles permitidos. Sin sesión te manda a `/login`; con un rol incorrecto muestra *Acceso denegado*.
2. **`Navbar`** muestra solo los enlaces del rol (la tabla está en `utils/roles.js`) y tiene el botón *Salir*.
3. **Cada página pide solo los datos del usuario**: el estudiante ve sus notas, el acudiente solo a sus hijos, y el docente es el único con el panel que modifica notas.

Cuentas de ejemplo: `data/usuarios.js` (documentadas en el `README.md` de la raíz).

> Esto es seguridad **de la interfaz** (sirve para la demo y la rúbrica). Con un backend real, el servidor también debe comprobar el rol en cada petición.

### `src/services/`: acceso a datos

| Archivo | Funciones |
|---|---|
| `api.js` | `peticion()` (el `fetch` real), `simularRespuesta()` y `simularError()` (para el modo mock) |
| `authService.js` | `iniciarSesion` (valida correo, contraseña y rol), `registrarUsuario`, `recuperarPassword` |
| `hijosService.js` | `obtenerMisNotas(estudianteId)`, `obtenerHijos(acudienteId)`, `obtenerHijo(id)` |
| `notasService.js` | `obtenerEstudiantesDocente`, `obtenerMateriasDocente`, `guardarCalificaciones` |
| `calendarioService.js` | `obtenerTareas`, `obtenerFestivos`, `crearTarea` |

Cada función tiene la misma forma: si `USAR_MOCK` es verdadero devuelve datos de `src/data/` (con una pequeña espera para ver el spinner); si no, llama al backend con `peticion()`. **Cuando exista el backend solo hay que poner `VITE_USAR_MOCK=false`** (y ajustar las rutas si hace falta).

### `src/hooks/useCargarDatos.js`
Pide datos a un servicio y devuelve `{ datos, cargando, error }`. Usa `useState` y `useEffect`.

### `src/utils/notas.js`
Funciones de cálculo sin nada visual. Escala de 1.0 a 5.0 y se gana con 3.0: `redondear`, `calcularPromedio`, `esNotaValida`, `nivelColor` (verde / amarillo / rojo), `calcularTendencia` (`sube` / `baja` / `estable`, con los símbolos de `ICONOS_TENDENCIA`) y `resumenEstudiante` (promedio general y materias en riesgo). Una materia está **en riesgo** si su promedio es menor a 3.0 (`NOTA_APROBATORIA`).

### `src/data/`
Datos de ejemplo crudos (`hijos.js`, `estudiantes.js`, `calendario.js`). **Solo los importan los servicios** (y el calendario para sus listas fijas de materias y tipos).

### `src/components/`
- **`Encabezado`**: logo + nombre + rol (recibe `nombre` y `rol` por props).
- **`NotaBadge`**: una nota con su color (usa `nivelColor`).
- **`Navbar`**: barra de navegación con `NavLink`, distinta para cada rol, con botón *Salir*; en celular se abre con el botón ☰.
- **`LayoutApp`**: `Navbar` + `<Outlet />` (si no hay sesión, manda al login).
- **`RutaProtegida`** y **`AccesoDenegado`**: control de acceso por rol.
- **`Cargando`**: spinner con texto.
- **`MensajeError`**: tarjeta de error con enlace para volver.

### `src/pages/`

- **`Inicio`**: página de bienvenida estática con enlaces. El botón de fondo funciona con CSS puro (`checkbox` + `:checked`).
- **`Login`**: formulario controlado (`rol`, `usuario` = correo, `password`). Al enviar: valida, hace `console.log` del objeto, inicia sesión con `useAuth().iniciar` (el botón muestra "Ingresando...") y navega a la página de su rol. Solo entra quien use la cuenta con su rol.
- **`Registro`**: un único estado (objeto `form`) para todos los campos; una sola función `manejarCambio` usa el `name` de cada input. Valida contraseñas, muestra `console.log` del objeto, llama a `registrarUsuario` y muestra mensaje de éxito.
- **`Recuperacion`**: formulario controlado con el correo; muestra éxito o error.
- **`VisualNotas`**: vista del estudiante; pide **sus** notas (`usuario.estudianteId`) con `useCargarDatos` y calcula promedios.
- **`PanelDocente`**: dos componentes: `PanelDocente` pide los datos (spinner/error) y `TablaCalificaciones` los usa como estado inicial para editarlos. El promedio se recalcula al escribir; las notas fuera de 0–5 se marcan en rojo y no dejan guardar; "Guardar" llama a `guardarCalificaciones`.
- **`AcudienteLista`**: tarjetas con los hijos **de ese acudiente**; cada una es un `<Link>` al detalle.
- **`DetalleHijo`**: página de detalle. Lee `:hijoId` con `useParams`, pide al hijo y muestra alertas, resumen y tabla con tendencias. Si el id no existe muestra el error.
- **`Calendario`**: `Calendario` pide tareas y festivos; `CalendarioContenido` maneja filtros, el modal y agregar tareas (`crearTarea`). Usa la sesión del login: el estudiante solo consulta las tareas de su grado; el docente ve todas, filtra por grado y programa tareas. Arranca en **octubre de 2025** porque ahí están los datos de ejemplo.
- **`ErrorPage`**: página 404 y de errores inesperados.

---

## 7. Sobre los estilos CSS

En HTML puro, cada página tenía su CSS y no había problema. En React **todas las páginas viven en la misma app**, y los CSS se cargan globalmente: si dos archivos definían `.container` o `body`, se pisaban.

**Solución aplicada:** cada página se envuelve en un `<div>` con una clase propia (`pg-login`, `pg-docente`, `pg-calendario`...) y **todos los selectores de su CSS empiezan con esa clase**. Ejemplo:

```css
/* antes */   .container { ... }
/* ahora */   .pg-docente .container { ... }
```

Y el `body { ... }` original ahora es `.pg-docente { ... }` (el contenedor hace de "body" de esa página).

Al agregar estilos nuevos a una página, escríbelos también con su prefijo.

---

## 8. Flujo de datos (cómo se conecta todo)

```
data/hijos.js ─► services/hijosService.js ─► hooks/useCargarDatos.js ─► pages/DetalleHijo.jsx ─► pantalla
 (datos mock)     (simula/consulta la API)    (cargando / error / datos)   (usa utils/notas.js para
                                                                            calcular y components/ para dibujar)
```
Cuando se conecte el backend solo cambia el **primer eslabón**: el servicio llamará a `peticion()` en vez de leer `data/`. Las páginas ni se enteran.

---

## 9. Trabajo en equipo y Git

Todo el paso a paso para que los 4 integrantes construyan el proyecto (instalación, repositorio, ramas Gitflow, commits, Pull Requests y reparto de tareas) está en **[GUIA_EQUIPO.md](./GUIA_EQUIPO.md)**.

---

## 10. Lo que NO tiene (a propósito)

Para mantener el proyecto al nivel del curso, esto queda fuera por ahora:

- Backend real, base de datos y autenticación real (el modo mock valida contra las cuentas de `data/usuarios.js`; el control de roles es de la interfaz).
- Guardado permanente: al recargar, los cambios se pierden (la rúbrica no pide persistencia).
- TypeScript, Redux, pruebas automáticas.

**Siguientes pasos naturales:** conectar con el backend (`VITE_USAR_MOCK=false`) → autenticación con tokens y comprobación de roles en el servidor.

---

## 11. Preguntas frecuentes

**¿Por qué la ruta de las imágenes es `/academixlogo.jpg` y no `public/academixlogo.jpg`?**
Todo lo que está en `public/` se sirve desde la raíz del sitio, sin escribir "public".

**¿Por qué `key` en cada `.map()`?**
Para que React identifique cada elemento. Si falta, aparece una advertencia en la consola.

**¿Por qué no modificar el estado directamente (`estudiantes[0].nota = 5`)?**
React solo redibuja cuando llamamos a `setEstudiantes` con un valor **nuevo**. Si mutas el original, la pantalla no se actualiza.

**¿Qué significa `evento.preventDefault()`?**
Un `<form>` por defecto recarga la página al enviarse. Con `preventDefault()` lo evitamos para manejar el envío nosotros.

**Me aparece "Cannot find module 'react-router-dom'".**
Falta ejecutar `npm install`.

**¿Dónde cambio la URL del backend?**
En el archivo `.env` (variable `VITE_API_URL`). Nunca se escribe la URL en las páginas.

**¿Dónde cambio el umbral de riesgo o la escala de notas?**
En la parte superior de `src/utils/notas.js` (`NOTA_MINIMA`, `NOTA_MAXIMA`, `NOTA_APROBATORIA`).

---

## 12. Glosario

- **Componente**: función que devuelve parte de la interfaz.
- **JSX**: sintaxis que mezcla HTML con JavaScript.
- **Props**: datos que recibe un componente.
- **Estado**: datos que el componente recuerda y que, al cambiar, redibujan la pantalla.
- **Hook**: función de React que empieza con `use` (`useState`, `useNavigate`).
- **SPA (Single Page Application)**: app con una sola página HTML donde el contenido cambia sin recargar.
- **Vite**: herramienta que ejecuta y empaqueta el proyecto.
- **Mock / datos de ejemplo**: datos falsos para desarrollar sin backend.
- **Render**: el momento en que React dibuja (o vuelve a dibujar) un componente.
