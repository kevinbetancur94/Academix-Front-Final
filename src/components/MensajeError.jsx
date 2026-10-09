import { Link } from 'react-router-dom'
import '../css/feedback.css'

// Mensaje de error cuando un servicio falla. Ofrece un enlace para volver.
function MensajeError({ mensaje, volverA = '/', textoVolver = 'Volver al inicio' }) {
  return (
    <div className="ui-error" role="alert">
      <h2>Algo salió mal</h2>
      <p>{mensaje}</p>
      <Link to={volverA}>{textoVolver}</Link>
    </div>
  )
}

export default MensajeError
