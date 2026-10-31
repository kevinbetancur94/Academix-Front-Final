# Guía de equipo: construir Academix desde cero (Kevin, Alex, Nataly y Karen)

Esta guía asume que **nadie sabe nada**: empieza instalando los programas y termina con el proyecto terminado y entregado. Está pensada para que **los 4 participen en la creación de todo** y para que el repositorio muestre evidencia clara del trabajo de cada uno (lo que pide la rúbrica, HU-07).

> **Cómo leerla:** sigue las partes en orden. Las partes 1 y 2 las hace **cada persona en su computador**. A partir de la parte 4 hay pasos que hace una sola persona (se indica quién).

---

## Índice

1. [Instalar lo necesario (los 4)](#1-instalar-lo-necesario-los-4)
2. [Git y GitHub en 5 minutos](#2-git-y-github-en-5-minutos)
3. [Reglas del equipo](#3-reglas-del-equipo)
4. [Crear el repositorio y el proyecto (Kevin)](#4-crear-el-repositorio-y-el-proyecto-kevin)
5. [Que los demás se unan (Alex, Nataly y Karen)](#5-que-los-demás-se-unan-alex-nataly-y-karen)
6. [El ciclo de trabajo de cada tarea](#6-el-ciclo-de-trabajo-de-cada-tarea)
7. [Conventional Commits (cómo escribir los mensajes)](#7-conventional-commits-cómo-escribir-los-mensajes)
8. [Reparto de tareas y orden de trabajo](#8-reparto-de-tareas-y-orden-de-trabajo)
9. [Entrega final y checklist de la rúbrica](#9-entrega-final-y-checklist-de-la-rúbrica)
10. [Problemas comunes y cómo resolverlos](#10-problemas-comunes-y-cómo-resolverlos)

---

## 1. Instalar lo necesario (los 4)

Cada integrante instala **todo esto en su propio computador**.

### 1.1 Cuenta de GitHub
1. Entra a <https://github.com> y crea una cuenta (si no la tienes).
2. **Anota el correo con el que te registraste**: lo vas a necesitar en el paso 1.5.

### 1.2 Node.js (para ejecutar el proyecto)
1. Entra a <https://nodejs.org> y descarga la versión **LTS** (la recomendada).
2. Instálala dejando todas las opciones por defecto (siguiente, siguiente...).
3. Cierra y vuelve a abrir la terminal. Comprueba que funcionó:

```bash
node -v
npm -v
```
Cada uno debe mostrar un número de versión (ej. `v22.12.0`). Necesitas Node **20.19 o superior**.

### 1.3 Git (para el control de versiones)
1. Descarga desde <https://git-scm.com/downloads> e instálalo con las opciones por defecto.
2. Comprueba:

```bash
git --version
```

### 1.4 Visual Studio Code (el editor)
1. Descárgalo de <https://code.visualstudio.com> e instálalo.
2. Dentro de VS Code abre la pestaña de extensiones (cuadritos a la izquierda) e instala:
   - **ESLint** (avisa errores en el código)
   - **GitLens** (opcional: muestra quién escribió cada línea)

**La terminal dentro de VS Code:** menú *Terminal → Nueva terminal*. Ahí escribirás los comandos de esta guía.

### 1.5 Presentarte ante Git (¡MUY IMPORTANTE!)
Git pone tu nombre en cada commit. Si esto está mal configurado, **tus commits no aparecerán a tu nombre en GitHub** y la rúbrica exige que cada integrante tenga commits propios.

Ejecuta (cambiando por tus datos; el correo debe ser **el mismo de tu cuenta de GitHub**):

```bash
git config --global user.name "Tu Nombre Apellido"
git config --global user.email "tucorreo@ejemplo.com"
git config --global init.defaultBranch main
```
Comprueba:
```bash
git config --global --list
```

> Si usas un computador compartido o de la sala de sistemas, usa `--local` en lugar de `--global` **dentro de la carpeta del proyecto**, para no mezclar tu nombre con el de otra persona.

### 1.6 Conectar tu computador con GitHub
La primera vez que hagas `git push` o `git clone` de un repositorio privado se abrirá una ventana del navegador pidiendo que inicies sesión en GitHub: inicia sesión y autoriza. Eso es todo (viene incluido con Git para Windows).

Si no se abre ninguna ventana y te pide usuario y contraseña: GitHub **ya no acepta la contraseña**, hay que usar un *token*: GitHub → tu foto → *Settings → Developer settings → Personal access tokens → Tokens (classic) → Generate new token*, marca `repo`, copia el token y úsalo como contraseña.

### 1.7 Comandos de terminal que necesitas saber

| Comando | Qué hace |
|---|---|
| `cd carpeta` | Entrar a una carpeta |
| `cd ..` | Subir una carpeta |
| `dir` (Windows) / `ls` (Mac/Linux) | Ver qué hay en la carpeta |
| `mkdir nombre` | Crear una carpeta |
| `Ctrl + C` | Detener un programa que está corriendo (ej. el servidor) |

---

## 2. Git y GitHub en 5 minutos

- **Repositorio (repo):** la carpeta del proyecto con todo su historial.
- **Commit:** una "foto" del proyecto en un momento, con un mensaje que dice qué cambió.
- **Rama (branch):** una línea de trabajo paralela. Permite que cada uno trabaje sin pisar a los demás.
- **Push:** subir tus commits a GitHub. **Pull:** bajar los cambios de los demás.
- **Pull Request (PR):** pedir que tus cambios de una rama se unan a otra. Los compañeros los revisan antes.
- **Merge:** unir una rama con otra.

### Gitflow: las ramas que vamos a usar

```
main ─────────────●──────────────────────────────●───  (versión estable/final)
                   \                              /
develop ────●───●───●───●───●───●───●───●───●───●────  (donde se junta todo el trabajo)
             \     / \     /     \     /
feature/login ●─●─●   feature/navbar ●─●   feature/calendario ●─●─●
```

| Rama | Para qué sirve |
|---|---|
| `main` | Solo versiones terminadas y probadas. **Nadie trabaja aquí.** |
| `develop` | Rama de integración. Aquí llegan las tareas ya revisadas. |
| `feature/nombre-tarea` | Una por tarea nueva (ej. `feature/pagina-login`). Sale de `develop` y vuelve a `develop` con un PR. |
| `fix/nombre-error` | Igual que feature, pero para arreglar un error. |

---

## 3. Reglas del equipo

1. **Nadie hace commits directamente en `main` ni en `develop`.** Siempre en una rama `feature/...` o `fix/...`.
2. **Cada tarea = una rama = un Pull Request.**
3. **Nadie aprueba ni une (merge) su propio Pull Request.** Lo revisa otra persona (ver tabla de revisores en la parte 8).
4. **Cada uno hace sus commits desde su propio computador y su propia cuenta de GitHub.** Prohibido "prestar" la sesión o subir el trabajo de otro con tu usuario.
5. **Commits pequeños y frecuentes**, con mensajes en formato Conventional Commits (parte 7).
6. **Antes de empezar una tarea siempre se actualiza `develop`** (`git pull`). Así se evitan los conflictos.
7. **Cada persona edita solo los archivos de sus tareas.** Si necesitas cambiar un archivo de otra persona, avísale por el grupo.
8. **Pair programming permitido:** pueden sentarse juntos, pero el commit lo hace **quien tiene la tarea asignada**; el otro lo menciona en la descripción del PR.

> **Meta de evidencia:** cada integrante termina con **mínimo 8 commits y 4 Pull Requests propios**, y revisa al menos 3 PRs de otros.

---

## 4. Crear el repositorio y el proyecto (Kevin)

> Mientras Kevin hace esta parte (≈ 20 minutos), los demás hacen la parte 1 completa si les falta algo, y leen `GUIA.md` (explica el proyecto; está dentro de `academix.zip`) para entender a dónde van.

### 4.1 Crear el repositorio en GitHub
1. En GitHub, botón verde **New** (nuevo repositorio).
2. Nombre: `academix`. Elige **Private** (o Public, según indique el profesor).
3. **No** marques "Add a README" ni ".gitignore" (el proyecto los traerá).
4. Clic en **Create repository**.

### 4.2 Invitar al equipo
*Settings → Collaborators → Add people* → escribe el usuario de GitHub de Alex, Nataly y Karen. Cada una recibe un correo/notificación y debe **aceptar la invitación**.

### 4.3 Crear el proyecto con Vite
En la terminal, ubícate donde guardas tus trabajos (ej. `cd Documentos`) y ejecuta:

```bash
npm create vite@latest academix
```
Responde lo que te pregunta:
- *Select a framework* → **React**
- *Select a variant* → **JavaScript** (no TypeScript). Si aparece una variante "con React Compiler", también sirve.
- Si pregunta si instalar y ejecutar ahora, elige **No**.

Luego:
```bash
cd academix
npm install
npm install react-router-dom
npm run dev
```
Abre la dirección que aparece (normalmente <http://localhost:5173>). Si ves la página de Vite + React, todo va bien. Detén el servidor con `Ctrl + C`.

### 4.4 Subir el primer commit
Asegúrate de estar dentro de la carpeta `academix`:

```bash
git init
git add .
git commit -m "chore: inicializar proyecto con Vite y React"
git branch -M main
git remote add origin https://github.com/USUARIO/academix.git
git push -u origin main
```
(Cambia `USUARIO` por tu usuario de GitHub, o copia la URL desde la página del repositorio.)

### 4.5 Crear la rama `develop`
```bash
git checkout -b develop
git push -u origin develop
```
Y en GitHub: *Settings → Branches → Default branch* → cambia a **develop** (así los Pull Requests apuntan a `develop` por defecto).

Avisa al grupo: **"Repo listo, ya pueden clonar."**

---

## 5. Que los demás se unan (Alex, Nataly y Karen)

1. Acepta la invitación del repositorio.
2. Clona el proyecto (copia la URL del botón verde **Code** en GitHub):

```bash
cd Documentos
git clone https://github.com/USUARIO/academix.git
cd academix
git checkout develop
npm install
npm run dev
```
3. Abre la carpeta en VS Code (`code .` o *Archivo → Abrir carpeta*).
4. Comprueba que ves la página de Vite + React.

**Kevin también:** los 4 deben tener la carpeta clonada y funcionando antes de seguir.

### El proyecto de referencia
Descomprime `academix.zip` (el que te entregó el profesor/compañero) en **una carpeta aparte, fuera del repositorio** (ej. `Escritorio/academix-referencia`). Es el proyecto ya terminado: de ahí **copiarán cada archivo, pero solo cuando les toque**, entendiéndolo antes. En la guía, "copiar de la referencia" significa eso.

> **No copien** la carpeta `node_modules` ni `package-lock.json`.

---

## 6. El ciclo de trabajo de cada tarea

Repite esto para **cada tarea** de la parte 8. Ejemplo con la tarea `feature/pagina-login`:

**Paso 1: Actualizar `develop`**
```bash
git checkout develop
git pull origin develop
```

**Paso 2: Crear tu rama**
```bash
git checkout -b feature/pagina-login
```
Comprueba en qué rama estás: `git branch` (la actual tiene un `*`).

**Paso 3: Trabajar**
Crea o copia los archivos de la tarea, léelos, **entiéndelos** y pruébalos con `npm run dev`. Si el compañero que te explica te pregunta "¿qué hace esto?", deberías poder responder.

**Paso 4: Hacer commits pequeños**
Un commit por cada pieza lógica (no esperes a terminar todo):
```bash
git status                       # ver qué archivos cambiaron
git add src/css/login.css
git commit -m "style: agregar estilos de la página de login"
git add src/pages/Login.jsx
git commit -m "feat: crear página de login con selección de rol"
```

**Paso 5: Subir la rama a GitHub**
```bash
git push -u origin feature/pagina-login
```
(La primera vez usa `-u`; después basta con `git push`.)

**Paso 6: Abrir el Pull Request**
1. En GitHub aparece un aviso amarillo **"Compare & pull request"**: haz clic.
2. Verifica que diga **base: `develop`** ← **compare: `feature/pagina-login`**.
3. Título con el mismo formato de commits: `feat: página de login`.
4. Descripción (copia y llena):

```
## Qué hace
- Crea la página de login con selección de rol

## Cómo probarlo
1. npm run dev
2. Ir a /login, elegir un rol, escribir usuario y contraseña
3. Ver el objeto en la consola del navegador (F12)

## Historias de usuario
HU-06
```
5. En **Reviewers** (a la derecha) elige a tu revisor.
6. **Create pull request.**

**Paso 7: Revisión (la hace tu compañero)**
El revisor: *Files changed* → lee el código → si algo no se entiende o falla, comenta en la línea; si está bien, **Review changes → Approve**. Lo ideal es también descargar la rama y probarla:
```bash
git fetch
git checkout feature/pagina-login
npm install
npm run dev
```

**Paso 8: Unir (merge)**
Cuando está aprobado, **otra persona distinta al autor** hace clic en **Merge pull request → Confirm merge** (usen *Create a merge commit*, **no** "Squash", así se conservan los commits de cada uno). Luego **Delete branch**.

**Paso 9: Volver a empezar**
```bash
git checkout develop
git pull origin develop
```
y a la siguiente tarea.

### Si te piden cambios en el PR
Haz los arreglos en **la misma rama**, nuevo commit (`fix: ...`), `git push`. El PR se actualiza solo.

### Si dos personas tocaron el mismo archivo (conflicto)
Git avisa con "CONFLICT". Abre el archivo en VS Code: verás marcas `<<<<<<<`, `=======`, `>>>>>>>` con botones **Accept Current / Accept Incoming / Accept Both**. Elige lo correcto, guarda, y:
```bash
git add archivo-con-conflicto
git commit -m "fix: resolver conflicto en archivo"
git push
```
Para no llegar a esto: sigan la regla 7 (cada uno edita solo sus archivos).

---

## 7. Conventional Commits (cómo escribir los mensajes)

Formato: `tipo: descripción corta en minúscula y sin punto final`

| Tipo | Cuándo usarlo | Ejemplo |
|---|---|---|
| `feat` | Agregas una funcionalidad nueva | `feat: agregar navbar con NavLink` |
| `fix` | Arreglas un error | `fix: corregir cálculo del promedio` |
| `docs` | Solo documentación | `docs: agregar README de la carpeta src` |
| `style` | Estilos CSS o formato (sin cambiar lógica) | `style: hacer responsive el registro` |
| `chore` | Configuración, dependencias, tareas de mantenimiento | `chore: instalar react-router-dom` |
| `refactor` | Reorganizar código sin cambiar lo que hace | `refactor: mover cálculos a utils/notas.js` |

Reglas: en español, verbo en infinitivo (agregar, crear, corregir), máximo ~70 caracteres, **un cambio por commit**.

Ramas: `feature/nombre-con-guiones` y `fix/nombre-con-guiones`, todo en minúscula.

---

## 8. Reparto de tareas y orden de trabajo

### 8.1 Quién hace qué (resumen)

| Persona | Responsabilidad | Historias de usuario |
|---|---|---|
| **Kevin** | Arquitectura: configuración, servicios base, router, navegación, página de inicio, 404 | HU-01, HU-02, HU-05 |
| **Alex** | Autenticación (servicio, login, registro, recuperación) y calendario escolar | HU-06, HU-02, HU-04 |
| **Nataly** | Cálculo de notas, componentes de notas, vista del estudiante y panel docente | HU-03, HU-04, HU-06 |
| **Karen** | Datos y servicio de hijos, feedback visual (spinner/errores), vistas del acudiente (lista y detalle), documentación | HU-04, HU-05, HU-01 |

**Revisores** (rotativo, nadie revisa lo propio):

| Autor del PR | Revisa | Segundo revisor (opcional) |
|---|---|---|
| Kevin | Nataly | Karen |
| Alex | Kevin | Nataly |
| Nataly | Karen | Alex |
| Karen | Alex | Kevin |

**Quien une (merge) el PR:** el revisor, después de aprobar.

### 8.2 Las 4 olas de trabajo

El trabajo se divide en olas para que **nadie se quede esperando** y los archivos que dependen de otros lleguen en orden. **Una ola empieza cuando todos los PR de la anterior están unidos a `develop`** (y todos hacen `git pull origin develop`).

```
OLA 1 (en paralelo) → OLA 2 (en paralelo) → OLA 3 (en paralelo) → OLA 4 (cierre)
 base y datos          router, servicios      páginas                 pulido y entrega
                       y componentes
```

Todo lo que dice **"copiar de la referencia"** está en la carpeta del proyecto terminado. La ruta es la misma dentro de `src/`.

---

### 🔵 OLA 1: Base y datos (los 4 en paralelo)

**Kevin**: rama `feature/estructura-y-configuracion` (HU-01, HU-02)

| Qué hacer | Archivos |
|---|---|
| Copiar logo, video y favicon | `public/` (los 4 archivos de la referencia) |
| Ajustar título y favicon de la página | `index.html` (copiar de la referencia) |
| Documentar la estructura | `src/README.md` |
| Archivo de configuración y variables de entorno | `src/config.js`, `.env.example`, y agregar `.env` al `.gitignore` |
| Funciones base de servicios | `src/services/api.js` |
| Hook de carga de datos | `src/hooks/useCargarDatos.js` |

Commits sugeridos:
1. `chore: agregar logo, video y favicon a public`
   · `chore: actualizar título y favicon en index.html`
2. `docs: agregar README con la estructura de src`
3. `feat: agregar config.js con la URL base de la API`
4. `chore: agregar .env.example e ignorar .env`
5. `feat: agregar funciones base de servicios en api.js`
6. `feat: agregar hook useCargarDatos`

**Nataly**: rama `feature/utilidades-notas` (HU-03)

| Qué hacer | Archivos |
|---|---|
| Funciones de cálculo (promedio, tendencia, riesgo) | `src/utils/notas.js` |

Commits sugeridos (la función se puede ir agregando por partes):
1. `feat: agregar constantes y funciones de promedio y redondeo`
2. `feat: agregar validación de notas y nivel de color`
3. `feat: agregar cálculo de tendencia`
4. `feat: agregar resumenEstudiante para promedio general y riesgo`

**Karen**: ramas `feature/datos-hijos` y `feature/estilos-feedback` (HU-04)

| Rama | Archivos |
|---|---|
| `feature/datos-hijos` | `src/data/hijos.js` |
| `feature/estilos-feedback` | `src/css/feedback.css` (spinner, tarjeta de error, página de error) |

Commits sugeridos: `feat: agregar datos de ejemplo de los hijos` · `style: agregar estilos del spinner de carga` · `style: agregar estilos de mensajes y página de error`

**Alex**: rama `feature/datos-calendario`

| Qué hacer | Archivos |
|---|---|
| Datos del calendario (materias, tipos, tareas, festivos) | `src/data/calendario.js` |

Commits sugeridos: `feat: agregar catálogos de materias, tipos y grados` · `feat: agregar tareas de ejemplo` · `feat: agregar festivos de Colombia 2025`

> Cuando terminen: los 4 PR revisados y unidos a `develop` → todos hacen `git pull origin develop`.

---

### 🟢 OLA 2: Router, servicios y componentes (en paralelo)

**Kevin**: rama `feature/router-y-navegacion` (HU-05)

| Qué hacer | Archivos |
|---|---|
| Barra de navegación con `NavLink` (menú ☰ en celular) | `src/components/Navbar.jsx`, `src/css/navbar.css` |
| Plantilla con navbar + `<Outlet />` | `src/components/LayoutApp.jsx` |
| Página de error / 404 | `src/pages/ErrorPage.jsx` |
| **Páginas temporales** para que el router compile: crea cada una vacía con este contenido (cambiando el nombre): | `Inicio`, `Login`, `Registro`, `Recuperacion`, `VisualNotas`, `PanelDocente`, `AcudienteLista`, `DetalleHijo`, `Calendario` en `src/pages/` |
| Estilos globales (incluye el efecto de botón deshabilitado) | `src/index.css` (copiar de la referencia) |
| Mapa de rutas con `createBrowserRouter` | `src/router/index.jsx` |
| Arrancar con `RouterProvider` | `src/main.jsx` (reemplaza el de Vite) |
| Borrar lo que ya no se usa de Vite | `src/App.jsx`, `src/App.css`, `src/assets/` |

Página temporal (ejemplo `Login.jsx`):
```jsx
function Login() {
  return <h1>Login (pendiente)</h1>
}

export default Login
```
Estas páginas temporales **las reemplazarán sus dueños en la ola 3**, sin conflictos porque cada archivo lo edita una sola persona.

Commits sugeridos:
1. `feat: agregar Navbar con NavLink y menú responsive`
2. `feat: agregar LayoutApp con Outlet`
3. `feat: agregar página de error 404`
4. `chore: agregar páginas temporales para las rutas`
5. `feat: configurar rutas con createBrowserRouter`
6. `refactor: usar RouterProvider en main.jsx y eliminar App de Vite`

**Alex**: ramas `feature/servicio-autenticacion` y `feature/servicio-calendario` (HU-02)

| Rama | Archivos |
|---|---|
| `feature/servicio-autenticacion` | `src/services/authService.js` |
| `feature/servicio-calendario` | `src/services/calendarioService.js` |

**Nataly**: ramas `feature/componentes-notas` y `feature/servicio-notas` (HU-03, HU-02)

| Rama | Archivos |
|---|---|
| `feature/componentes-notas` | `src/components/Encabezado.jsx`, `src/components/NotaBadge.jsx` |
| `feature/servicio-notas` | `src/data/estudiantes.js`, `src/services/notasService.js` |

**Karen**: ramas `feature/servicio-hijos` y `feature/componentes-feedback` (HU-02, HU-04)

| Rama | Archivos |
|---|---|
| `feature/servicio-hijos` | `src/services/hijosService.js` |
| `feature/componentes-feedback` | `src/components/Cargando.jsx`, `src/components/MensajeError.jsx` |

Commits sugeridos (todos): un commit por archivo, ej. `feat: agregar servicio de autenticación con modo mock`, `feat: agregar componente NotaBadge`.

> Al terminar: PR revisados y unidos → todos `git pull origin develop`. Ahora ya pueden ejecutar `npm run dev` y ver el navbar y las rutas funcionando (con las páginas temporales).

---

### 🟠 OLA 3: Las páginas (en paralelo)

Cada persona **reemplaza el contenido de sus páginas temporales** con el código de la referencia. Entiéndanlo línea por línea antes de copiar.

**Kevin**: rama `feature/pagina-inicio`

| Archivos |
|---|
| `src/pages/Inicio.jsx`, `src/css/inicio.css` |

Commits: `style: agregar estilos de la página de inicio` · `feat: crear página de inicio con enlaces a login y registro`

**Alex**: ramas `feature/pagina-login`, `feature/registro-y-recuperacion`, `feature/calendario` (HU-06)

| Rama | Archivos |
|---|---|
| `feature/pagina-login` | `src/pages/Login.jsx`, `src/css/login.css` |
| `feature/registro-y-recuperacion` | `src/pages/Registro.jsx`, `src/pages/Recuperacion.jsx`, `src/css/registro.css`, `src/css/recuperacion.css` |
| `feature/calendario` | `src/pages/Calendario.jsx`, `src/css/calendario.css` |

Commits sugeridos para el login: `style: agregar estilos del login` · `feat: crear formulario de login controlado con useState` · `feat: mostrar objeto del formulario por consola` · `feat: conectar login con authService y estado de carga`

**Nataly**: ramas `feature/vista-estudiante` y `feature/panel-docente` (HU-03, HU-06)

| Rama | Archivos |
|---|---|
| `feature/vista-estudiante` | `src/pages/VisualNotas.jsx`, `src/css/visual-notas.css` |
| `feature/panel-docente` | `src/pages/PanelDocente.jsx`, `src/css/panel-docente.css` |

**Karen**: ramas `feature/lista-hijos` y `feature/detalle-hijo` (HU-05)

| Rama | Archivos |
|---|---|
| `feature/lista-hijos` | `src/pages/AcudienteLista.jsx` y los estilos de `src/css/acudientes.css` (la parte de `.children-grid`, `.child-card`...) |
| `feature/detalle-hijo` | `src/pages/DetalleHijo.jsx` (el resto de `src/css/acudientes.css`) |

> **Atención con `acudientes.css`:** lo editan dos ramas de Karen, así que **las hace ella en orden, una detrás de otra** (primero `detalle-hijo` con todo el archivo y luego `lista-hijos` agregando las clases `.children-grid`...). Así no hay conflicto.

> Al terminar la ola: PR unidos → `git pull`. Prueben **todos los flujos** en el navegador.

---

### 🔴 OLA 4: Pulido y entrega

| Quién | Rama | Qué hace |
|---|---|---|
| **Karen** | `docs/guias-del-proyecto` | Agregar `README.md` (raíz), `GUIA.md` y `GUIA_EQUIPO.md` |
| **Alex** | `fix/responsive-celular` | Revisar **todas** las páginas en modo celular (F12 → ícono de dispositivo móvil) y corregir lo roto con commits `style:` / `fix:` |
| **Nataly** | `fix/revision-lint` | Ejecutar `npm run lint` y corregir los avisos; revisar que ningún componente use `fetch` |
| **Kevin** | `release/v1.0.0` | Probar todo, y abrir el PR final **`develop` → `main`** |

**Release final (Kevin):** en GitHub, *Pull requests → New pull request* → **base: `main` ← compare: `develop`**. Otra persona lo revisa y lo une. Después, opcional: crear un *Release* con la etiqueta `v1.0.0`.

---

### 8.3 Resumen de la participación esperada

| Persona | Ramas | PR propios | Commits aprox. |
|---|---|---|---|
| Kevin | 4 (+ el commit inicial del proyecto) | 4 | 15+ |
| Alex | 7 | 7 | 20+ |
| Nataly | 6 | 6 | 16+ |
| Karen | 7 | 7 | 16+ |

Todos cumplen con creces el mínimo (8 commits y 4 PR).

---

## 9. Entrega final y checklist de la rúbrica

Antes de entregar, revisen **juntos** cada punto:

### HU-01: Estructura de carpetas
- [ ] Existen `pages/`, `components/`, `services/`, `hooks/`, `utils/`, `data/`, `css/`
- [ ] Los componentes reutilizables están separados de las páginas
- [ ] Existe `src/README.md` explicando la estructura

### HU-02: Servicios y API
- [ ] Búsqueda en VS Code (`Ctrl + Shift + F`) de `fetch(` y `axios`: **solo** aparece en `src/services/api.js`
- [ ] Existen los archivos de `src/services/`
- [ ] La URL base está solo en `src/config.js` / `.env.example`
- [ ] Las funciones de los servicios se exportan y las usan las páginas

### HU-03: React
- [ ] Proyecto creado con Vite
- [ ] Solo componentes funcionales
- [ ] Se usan `useState` y `useEffect` (este último en `useCargarDatos.js`)
- [ ] No hay `document.getElementById` fuera de `main.jsx`

### HU-04: Diseño y UX
- [ ] Colores y tipografías coherentes entre páginas
- [ ] Probado en celular, tablet y escritorio (F12 → modo dispositivo)
- [ ] Spinner de carga, mensajes de éxito y de error visibles
- [ ] Botones con efecto al pasar el mouse y deshabilitados mientras se envía
- [ ] No hay textos ilegibles ni elementos rotos

### HU-05: React Router
- [ ] `react-router-dom` en `package.json` (versión 6.4 o superior)
- [ ] Rutas definidas con `createBrowserRouter` y `RouterProvider`
- [ ] Página de inicio (`/`), de detalle (`/acudiente/:hijoId`) y 404 (cualquier URL inventada)
- [ ] `Navbar` con `NavLink` funcionando

### HU-06: Formulario controlado
- [ ] Login, registro y recuperación usan `useState` en todos sus campos
- [ ] Usan `event.preventDefault()`
- [ ] Al enviar, la consola (F12 → Console) muestra un objeto con los datos

### HU-07: Git
- [ ] Existen `main`, `develop` y varias ramas `feature/...` o `fix/...`
- [ ] Todos los commits siguen Conventional Commits
- [ ] Cada integrante aparece con commits y PR propios (ver abajo cómo comprobarlo)
- [ ] Todo se integró con Pull Requests

**Cómo comprobar la participación de todos:**
- En GitHub: *Insights → Contributors*, o en la pestaña *Pull requests → Closed*.
- En la terminal:
```bash
git shortlog -sn --all     # commits por persona
git log --oneline --graph --all
```
Si alguien sale con 0 commits o con otro nombre, **se corrige antes de entregar** (casi siempre es el paso 1.5 mal configurado).

---

## 10. Problemas comunes y cómo resolverlos

**"node" o "npm" no se reconoce como comando.**
Cierra y abre VS Code (o reinicia el computador). Si sigue, reinstala Node.js.

**En Windows: "la ejecución de scripts está deshabilitada" al usar `npm`.**
Abre PowerShell como administrador y ejecuta: `Set-ExecutionPolicy RemoteSigned -Scope CurrentUser`. O usa la terminal "Command Prompt" en lugar de PowerShell.

**`git push` dice "rejected" o "non-fast-forward".**
Alguien subió cambios antes. Ejecuta `git pull origin NOMBRE-DE-TU-RAMA` y vuelve a `git push`.

**Mis commits aparecen con otro nombre o sin foto en GitHub.**
El correo de `git config user.email` no coincide con el de GitHub. Corrígelo (paso 1.5). Los commits ya hechos mantienen el correo viejo: se arreglan con el profesor o se agregan ese correo en *GitHub → Settings → Emails*.

**Hice cambios en la rama equivocada (por ejemplo en `develop`).**
Antes de hacer commit: `git stash`, `git checkout rama-correcta`, `git stash pop`. Si ya hiciste commit, avisa al grupo antes de intentar arreglarlo.

**Aparece "Port 5173 is in use".**
Hay otro servidor corriendo. Ciérralo con `Ctrl + C` o usa la dirección alternativa que muestra Vite.

**Pantalla en blanco en el navegador.**
Abre la consola (F12 → Console) y lee el error en rojo. Casi siempre es un `import` mal escrito, un archivo que falta o una letra mayúscula/minúscula incorrecta.

**"Cannot find module 'react-router-dom'".**
Ejecuta `npm install`. Si es la primera vez que usas la rama de Kevin, también `git pull`.

**Después de un `git pull` la app dejó de funcionar.**
Ejecuta `npm install` (puede que se agregaron dependencias nuevas).

**No sé en qué rama estoy.**
`git branch` (la que tiene `*`). Con `git status` ves además qué archivos cambiaste.

**Quiero deshacer los cambios de un archivo que todavía no commiteé.**
`git restore src/pages/Login.jsx` (¡pierdes lo que no guardaste en un commit!).

---

**Consejo final:** no se trata de terminar rápido, sino de que **cada uno pueda explicar** lo que subió. En la sustentación pueden preguntarle a cualquiera cualquier parte del proyecto. Antes de cada commit, pregúntate: *"¿puedo explicar qué hace este archivo?"*. Si la respuesta es no, pregúntale a un compañero o revisa `GUIA.md`.
