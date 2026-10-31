import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth.js'
import { RUTA_INICIO } from '../utils/roles.js'
import '../css/login.css'

// Los tres tipos de usuario. Cada rol lleva a su propia página (RUTA_INICIO en utils/roles.js).
const roles = [
  { id: 'estudiante', texto: 'Estudiante' },
  { id: 'docente', texto: 'Docente' },
  { id: 'acudiente', texto: 'Acudiente' },
]

function Login() {
  // useState = memoria del componente. [valor, funciónParaCambiarlo]
  const [rol, setRol] = useState('estudiante')
  const [usuario, setUsuario] = useState('')
  const [password, setPassword] = useState('')
  const [recordar, setRecordar] = useState(false)
  const [error, setError] = useState('')
  const [enviando, setEnviando] = useState(false)
  const navigate = useNavigate() // permite cambiar de página desde el código
  const { iniciar } = useAuth() // guarda la sesión para toda la app

  async function manejarEnvio(evento) {
    evento.preventDefault() // evita que el formulario recargue la página
    if (usuario.trim() === '' || password === '') {
      setError('Ingresa tu correo y tu contraseña')
      return
    }

    // Objeto estructurado con lo capturado (lo pide la rúbrica: verlo por consola).
    // OJO: en un proyecto real NUNCA se imprime la contraseña; aquí es solo práctica.
    const datos = { rol, usuario, password, recordar }
    console.log('Datos del formulario de login:', datos)

    setError('')
    setEnviando(true) // feedback visual: el botón se deshabilita y cambia el texto
    try {
      const sesion = await iniciar(datos) // el componente NO hace fetch: pasa por el servicio
      navigate(RUTA_INICIO[sesion.rol])
    } catch (err) {
      setError(err.message)
      setEnviando(false)
    }
  }

  return (
    <div className="pg-login">
      <div className="login-container">
        <div className="logo-section">
          <img src="/academixlogo.jpg" alt="Logo Academix" className="logo-img" />
          <p>Sistema de Gestión de Notas</p>
        </div>

        <form onSubmit={manejarEnvio}>
          <div className="role-selector">
            {roles.map((r) => (
              <button
                key={r.id}
                type="button"
                className={`role-btn ${rol === r.id ? 'active' : ''}`}
                onClick={() => setRol(r.id)}
              >
                {r.texto}
              </button>
            ))}
          </div>

          <div className="form-group">
            <label htmlFor="usuario">Correo electrónico</label>
            <input
              type="text"
              id="usuario"
              placeholder="Ingresa tu correo"
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Contraseña</label>
            <input
              type="password"
              id="password"
              placeholder="Ingresa tu contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {error && <p className="mensaje-error">{error}</p>}

          <div className="options">
            <label className="remember-me">
                <input
                    type='checkbox'
                    checked={recordar}
                    onChange={(e) => setRecordar(e.target.checked)}/>
              Recordarme
            </label>
            <Link to="/recuperacion" className="forgot-password">
              ¿Olvidaste tu contraseña?
            </Link>
          </div>

          <button type="submit" className="login-btn" disabled={enviando}>
            {enviando ? 'Ingresando...' : 'Iniciar Sesión'}
          </button>
        </form>

        <details className="cuentas-prueba">
          <summary>Cuentas de prueba</summary>
          <ul>
            <li><strong>Estudiante:</strong> estudiante@academix.com / Estudiante123</li>
            <li><strong>Docente:</strong> docente@academix.com / Docente123</li>
            <li><strong>Acudiente:</strong> acudiente@academix.com / Acudiente123</li>
          </ul>
        </details>
      </div>
    </div>
  )
}

export default Login
