import { nivelColor } from '../utils/notas.js'
import '../css/notas.css'

// Muestra una nota con su color: verde (>= 4.0), amarillo (>= 3.0) o rojo (< 3.0).
// El cálculo del color vive en utils/notas.js; este componente solo lo dibuja.
function NotaBadge({ nota }) {
  if (nota === null || nota === undefined || nota === '') {
    return <span className="ui-nota ui-nota-vacia">—</span>
  }
  return <span className={`ui-nota ui-nota-${nivelColor(nota)}`}>{Number(nota).toFixed(1)}</span>
}

export default NotaBadge
