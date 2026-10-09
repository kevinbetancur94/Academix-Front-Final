# Guía de trabajo en equipo — Academix

## 1. Objetivo
Establecer un procedimiento común para trabajar en el repositorio Academix y evitar conflictos entre los integrantes.

## 2. Ramas principales
- `main`: rama principal del proyecto.
- `develop`: rama de integración de los cambios.
- Ramas de funcionalidad: se utilizan para desarrollar tareas específicas.

## 3. Crear una rama de trabajo
Antes de iniciar una tarea, actualiza `develop` y crea una rama independiente:

```bash
git switch develop
git pull origin develop
git switch -c nombre-de-la-rama
```

Utiliza un nombre que identifique la tarea, por ejemplo `feature/nombre-funcionalidad`.

## 4. Guardar cambios
Revisa los archivos modificados antes de preparar un commit:

```bash
git status
git diff
```

Agrega únicamente los archivos relacionados con tu tarea. Después, crea el commit:

```bash
git add ruta/del/archivo
git commit -m "Descripción breve del cambio"
```

## 5. Publicar la rama
Envía la rama al repositorio remoto:

```bash
git push -u origin nombre-de-la-rama
```

## 6. Crear un Pull Request
En GitHub, crea un Pull Request desde tu rama de trabajo hacia `develop`.

Antes de solicitar la integración:
- Verifica la rama base y la rama de origen.
- Revisa los archivos incluidos en el PR.
- Comprueba los resultados de las verificaciones disponibles.
- Solicita revisión cuando corresponda a las reglas del equipo.

Integra los cambios utilizando el procedimiento acordado por el equipo.

## 7. Buenas prácticas
- No trabajes directamente sobre `main` o `develop`.
- No incluyas archivos ajenos a tu tarea.
- Comunica los cambios que puedan afectar a otros integrantes.
- No sobrescribas el trabajo de otras personas sin consultarlas.
- Mantén las ramas actualizadas y revisa los conflictos antes de integrar.

## 8. Resolución de problemas
Si aparecen conflictos, errores de compilación o archivos faltantes, identifica el mensaje y coordina la solución con el responsable de la funcionalidad antes de modificar componentes ajenos.
