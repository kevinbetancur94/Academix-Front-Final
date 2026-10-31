import { Link } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth.js'
import { NOMBRE_ROL, RUTA_INICIO } from '../utils/roles.js'
import '../css/feedback.css'

// Se muestra cuando alguien intenta entrar a una página que es de otro rol.
function AccesoDenegado() {
  const { usuario } = useAuth()

  return (
    <div className="ui-error" role="alert">
      <h2>Acceso denegado</h2>
      <p>Esta página no está disponible para tu rol ({NOMBRE_ROL[usuario.rol]}).</p>
      <Link to={RUTA_INICIO[usuario.rol]}>Ir a mi página</Link>
    </div>
  )
}

export default AccesoDenegado
