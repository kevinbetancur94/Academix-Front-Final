# Documentación del código fuente de Academix

## 1. Estructura de carpetas

El código fuente de Academix se encuentra dentro de `src/` y está organizado de la siguiente manera:

- `assets/`: recursos estáticos utilizados por la aplicación.
- `components/`: componentes reutilizables de la interfaz.
- `css/`: hojas de estilo de las páginas y componentes.
- `data/`: archivos relacionados con datos de la aplicación.
- `hooks/`: hooks personalizados de React.
- `pages/`: páginas y vistas de la aplicación.
- `router/`: configuración de las rutas de navegación.
- `services/`: servicios y funciones de comunicación con otros sistemas.

## 2. Archivos principales

- `App.jsx`: componente principal de la aplicación.
- `App.css`: estilos asociados al componente principal.
- `main.jsx`: punto de entrada de React.
- `index.css`: estilos globales.
- `config.js`: configuración utilizada por el proyecto.

## 3. Navegación

La configuración de las rutas se encuentra en `router/`. Las páginas se organizan en `pages/` y pueden utilizar componentes reutilizables de `components/`.

## 4. Estilos

Los estilos globales y específicos se encuentran en los archivos CSS correspondientes. Se recomienda mantener los estilos organizados y evitar modificar archivos ajenos a la funcionalidad asignada.

## 5. Buenas prácticas

- Mantener cada componente enfocado en una responsabilidad.
- Reutilizar componentes cuando sea apropiado.
- Usar nombres descriptivos para archivos y variables.
- Revisar los cambios antes de crear un commit.
- Verificar el código con los comandos disponibles en el proyecto.

## 6. Mantenimiento

Antes de modificar una página o servicio, revisa sus importaciones y dependencias. Coordina con el equipo cualquier cambio que pueda afectar otras funcionalidades.
