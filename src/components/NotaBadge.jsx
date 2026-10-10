import { nivelColor } from '../utils/notas.js'

// Colores para cada nivel de nota (verde = bien, amarillo = aprobó justo, rojo = perdió)
const colores = {
  verde: { background: '#e3f4ec', color: '#1f6b4a' },
  amarillo: { background: '#fff4d6', color: '#8a6400' },
  rojo: { background: '#fde8e8', color: '#a12b2b' },
}

// Muestra una nota como una "etiqueta" de color.
// Uso: <NotaBadge valor={4.5} />
function NotaBadge({ valor }) {
  const estilo = {
    ...colores[nivelColor(valor)],
    padding: '4px 10px',
    borderRadius: '999px',
    fontWeight: 700,
  }
  return <span style={estilo}>{valor.toFixed(1)}</span>
}

export default NotaBadge