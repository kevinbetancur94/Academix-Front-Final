import { Link, useParams } from 'react-router-dom'
import Encabezado from '../components/Encabezado.jsx'
import NotaBadge from '../components/NotaBadge.jsx'
import Cargando from '../components/Cargando.jsx'
import MensajeError from '../components/MensajeError.jsx'
import { useCargarDatos } from '../hooks/useCargarDatos.js'
import { useAuth } from '../hooks/useAuth.js'
import { obtenerHijo } from '../services/hijosService.js'
import { calcularPromedio, calcularTendencia, resumenEstudiante, ICONOS_TENDENCIA } from '../utils/notas.js'
import '../css/acudientes.css'

// Página de DETALLE: lee el parámetro :hijoId de la URL con useParams.
function DetalleHijo() {
  const { hijoId } = useParams()
  const { usuario } = useAuth()
  const { datos: hijo, cargando, error } = useCargarDatos(obtenerHijo, hijoId)

  if (cargando) return <div className="pg-acudiente"><Cargando texto="Cargando información del estudiante..." /></div>
  // Un acudiente solo puede ver a SUS hijos (no basta con escribir otro id en la URL)
  const mensajeError = error || (hijo.acudienteId !== usuario.id ? 'No tienes acceso a la información de este estudiante.' : '')
  if (mensajeError) {
    return (
      <div className="pg-acudiente">
        <MensajeError mensaje={mensajeError} volverA="/acudiente" textoVolver="Volver a mis hijos" />
      </div>
    )
  }

  const resumen = resumenEstudiante(hijo.materias)

  return (
    <div className="pg-acudiente">
      <Encabezado nombre={usuario.nombre} rol="Acudiente" />

      <main className="contenido">
        <Link to="/acudiente" className="volver">← Volver a mis hijos</Link>

        <div className="ficha">
          <div className="avatar" aria-hidden="true">{hijo.nombre.charAt(0)}</div>
          <div className="info">
            <h1>{hijo.nombre}</h1>
            <p>Grado {hijo.grado}</p>
          </div>
          <div className="promedio">
            <span>Promedio general</span>
            <NotaBadge nota={resumen.promedioGeneral} />
          </div>
        </div>

        {resumen.enRiesgo ? (
          <div className="alerta alerta-riesgo" role="alert">
            ⚠️ <strong>Atención:</strong> {hijo.nombre.split(' ')[0]} va perdiendo {resumen.materiasEnRiesgo.join(', ')}.
          </div>
        ) : (
          <div className="alerta alerta-ok">✅ {hijo.nombre.split(' ')[0]} va aprobando todas sus materias.</div>
        )}

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
              {hijo.materias.map((m) => (
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

export default DetalleHijo
