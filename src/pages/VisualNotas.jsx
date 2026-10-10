import Encabezado from '../components/Encabezado.jsx'
import NotaBadge from '../components/NotaBadge.jsx'
import Cargando from '../components/Cargando.jsx'
import MensajeError from '../components/MensajeError.jsx'
import { useCargarDatos } from '../hooks/useCargarDatos.js'
import { obtenerHijo } from '../services/hijosService.js'
import { resumenEstudiante } from '../utils/notas.js'
import '../css/visual-notas.css'

// Vista del estudiante. Por ahora muestra a Juan (cuando haya login real, el id vendrá de la sesión).
const ID_ESTUDIANTE = 'juan'

function VisualNotas() {
  // El componente pide los datos al servicio mediante el hook. Estados: cargando / error / datos.
  const { datos: estudiante, cargando, error } = useCargarDatos(obtenerHijo, ID_ESTUDIANTE)

  if (cargando) return <div className="pg-notas"><Cargando texto="Cargando tus calificaciones..." /></div>
  if (error) return <div className="pg-notas"><MensajeError mensaje={error} /></div>

  const resumen = resumenEstudiante(estudiante.materias)

  return (
    <div className="pg-notas">
      <Encabezado nombre={estudiante.nombre} rol={`Estudiante - Grado ${estudiante.grado.split(' ')[0]}`} />

      <div className="container">
        <div className="student-card">
          <h2>Información Académica</h2>
          <div className="info-grid">
            <div className="info-item">
              <div className="label">Período Académico</div>
              <div className="value">2025 - Período 3</div>
            </div>
            <div className="info-item">
              <div className="label">Curso</div>
              <div className="value">{estudiante.grado}</div>
            </div>
            <div className="info-item">
              <div className="label">Última Actualización</div>
              <div className="value">15 Oct 2025</div>
            </div>
            <div className="info-item">
              <div className="label">Estado</div>
              <div className="value">Activo</div>
            </div>
          </div>
        </div>

        <div className="grades-section">
          <h2>Mis Calificaciones</h2>
          <div className="table-container">
            <table className="grades-table">
              <thead>
                <tr>
                  <th>Materia</th>
                  <th>Docente</th>
                  <th>Actividad 1</th>
                  <th>Actividad 2</th>
                  <th>Actividad 3</th>
                  <th>Promedio</th>
                  <th>Fecha</th>
                </tr>
              </thead>
              <tbody>
                {/* .map() recorre la lista y crea una fila por materia */}
                {resumen.filas.map((m) => (
                  <tr key={m.materia}>
                    <td className="subject-name">{m.materia}</td>
                    <td className="teacher-name">{m.docente}</td>
                    {m.notas.map((nota, i) => (
                      <td key={i}><NotaBadge valor={nota} /></td>
                    ))}
                    <td><NotaBadge valor={m.promedio} /></td>
                    <td className="date">{m.fecha}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="average-card">
            <div className="label">Promedio General del Período</div>
            <div className="value">{resumen.promedioGeneral.toFixed(1)}</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default VisualNotas
