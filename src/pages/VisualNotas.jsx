import Encabezado from '../components/Encabezado.jsx'
import NotaBadge from '../components/NotaBadge.jsx'
import Cargando from '../components/Cargando.jsx'
import MensajeError from '../components/MensajeError.jsx'
import { useCargarDatos } from '../hooks/useCargarDatos.js'
import { useAuth } from '../hooks/useAuth.js'
import { obtenerMisNotas } from '../services/hijosService.js'
import { calcularPromedio, calcularTendencia, resumenEstudiante, ICONOS_TENDENCIA } from '../utils/notas.js'
import '../css/visual-notas.css'

// Vista del estudiante: sus notas por materia y su promedio.
// Solo muestra las notas del estudiante que inició sesión (usuario.estudianteId).
function VisualNotas() {
  const { usuario } = useAuth()
  const { datos: estudiante, cargando, error } = useCargarDatos(obtenerMisNotas, usuario.estudianteId)

  if (cargando) return <div className="pg-visual-notas"><Cargando texto="Cargando tus notas..." /></div>
  if (error) return <div className="pg-visual-notas"><MensajeError mensaje={error} /></div>

  // Cuenta recién registrada: todavía no tiene notas
  if (!estudiante) {
    return (
      <div className="pg-visual-notas">
        <Encabezado nombre={usuario.nombre} rol={`Estudiante · ${usuario.grado}° Grado`} />
        <main className="contenido">
          <h1>Mis notas</h1>
          <p>Aún no tienes notas registradas. Cuando tus docentes las publiquen, aparecerán aquí.</p>
        </main>
      </div>
    )
  }

  const resumen = resumenEstudiante(estudiante.materias)

  return (
    <div className="pg-visual-notas">
      <Encabezado nombre={estudiante.nombre} rol={`Estudiante · ${estudiante.grado}`} />

      <main className="contenido">
        <h1>Mis notas</h1>

        <section className="resumen">
          <div className="tarjeta">
            <span className="etiqueta">Promedio general</span>
            <NotaBadge nota={resumen.promedioGeneral} />
          </div>
          <div className="tarjeta">
            <span className="etiqueta">Materias aprobadas</span>
            <strong>{estudiante.materias.length - resumen.materiasEnRiesgo.length} de {estudiante.materias.length}</strong>
          </div>
          <div className="tarjeta">
            <span className="etiqueta">Materias en riesgo</span>
            <strong>{resumen.materiasEnRiesgo.length}</strong>
          </div>
        </section>

        <div className="tabla-scroll">
          <table>
            <thead>
              <tr>
                <th>Materia</th>
                <th>Nota 1</th>
                <th>Nota 2</th>
                <th>Nota 3</th>
                <th>Promedio</th>
                <th>Tendencia</th>
              </tr>
            </thead>
            <tbody>
              {estudiante.materias.map((m) => (
                <tr key={m.nombre}>
                  <td>{m.nombre}</td>
                  {m.notas.map((nota, i) => (
                    <td key={i}><NotaBadge nota={nota} /></td>
                  ))}
                  <td><NotaBadge nota={calcularPromedio(m.notas)} /></td>
                  <td>{ICONOS_TENDENCIA[calcularTendencia(m.notas)]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  )
}

export default VisualNotas
