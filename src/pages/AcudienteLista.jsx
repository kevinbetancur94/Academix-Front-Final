import { Link } from 'react-router-dom'
import Encabezado from '../components/Encabezado.jsx'
import NotaBadge from '../components/NotaBadge.jsx'
import Cargando from '../components/Cargando.jsx'
import MensajeError from '../components/MensajeError.jsx'
import { useCargarDatos } from '../hooks/useCargarDatos.js'
import { useAuth } from '../hooks/useAuth.js'
import { obtenerHijos } from '../services/hijosService.js'
import { resumenEstudiante } from '../utils/notas.js'
import '../css/acudientes.css'

// Lista de los hijos del acudiente. Cada tarjeta es un <Link> a /acudiente/:hijoId
function AcudienteLista() {
  const { usuario } = useAuth()
  // Se piden solo los hijos de ESTE acudiente
  const { datos: hijos, cargando, error } = useCargarDatos(obtenerHijos, usuario.id)

  if (cargando) return <div className="pg-acudiente"><Cargando texto="Cargando a tus hijos..." /></div>
  if (error) return <div className="pg-acudiente"><MensajeError mensaje={error} /></div>

  return (
    <div className="pg-acudiente">
      <Encabezado nombre={usuario.nombre} rol="Acudiente" />

      <main className="contenido">
        <h1>Mis hijos</h1>
        <p className="descripcion">Selecciona un estudiante para consultar sus notas, alertas y tendencias.</p>

        {hijos.length === 0 && <p className="descripcion">Todavía no tienes estudiantes vinculados a tu cuenta.</p>}

        <div className="lista-hijos">
          {hijos.map((hijo) => {
            const resumen = resumenEstudiante(hijo.materias)
            return (
              <Link className="tarjeta-hijo" to={`/acudiente/${hijo.id}`} key={hijo.id}>
                <div className="avatar" aria-hidden="true">{hijo.nombre.charAt(0)}</div>
                <div className="info">
                  <h2>{hijo.nombre}</h2>
                  <p>Grado {hijo.grado}</p>
                </div>
                <div className="promedio">
                  <span>Promedio</span>
                  <NotaBadge nota={resumen.promedioGeneral} />
                </div>
                {resumen.enRiesgo && <span className="alerta-mini">⚠️ {resumen.materiasEnRiesgo.length} en riesgo</span>}
              </Link>
            )
          })}
        </div>
      </main>
    </div>
  )
}

export default AcudienteLista
