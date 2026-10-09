import '../css/feedback.css'

// Spinner que se muestra mientras llegan los datos de un servicio.
function Cargando({ texto = 'Cargando...' }) {
  return (
    <div className="ui-cargando" role="status">
      <div className="ui-spinner" />
      <p>{texto}</p>
    </div>
  )
}

export default Cargando
