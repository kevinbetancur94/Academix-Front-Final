import { Link, useRouteError, isRouteErrorResponse } from 'react-router-dom'
import '../css/feedback.css'

// Página de error. Se muestra en dos casos:
//  1) la URL no existe (404)
//  2) ocurrió un error inesperado dentro de una página
function ErrorPage() {
  const error = useRouteError() // undefined cuando solo es una URL que no existe

  const es404 = !error || (isRouteErrorResponse(error) && error.status === 404)
  const titulo = es404 ? 'Error 404' : 'Ocurrió un error inesperado'
  const detalle = es404
    ? 'La página que buscas no existe o fue movida.'
    : error.statusText || error.message || 'Intenta recargar la página.'

  return (
    <div className="ui-pagina-error">
      <div className="ui-error" role="alert">
        <h2>{titulo}</h2>
        <p>{detalle}</p>
        <Link to="/">Volver al inicio</Link>
      </div>
    </div>
  )
}

export default ErrorPage
