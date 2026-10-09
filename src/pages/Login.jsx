import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { iniciarSesion } from '../services/authService.js'
import '../css/login.css'

// Cada rol lleva a una página distinta.
const roles = [
  { id: 'estudiante', texto: 'Estudiante', ruta: '/estudiante' },
  { id: 'docente', texto: 'Docente', ruta: '/docente' },
  { id: 'acudiente', texto: 'Acudiente', ruta: '/acudiente' },
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

  async function manejarEnvio(evento) {
    evento.preventDefault() // evita que el formulario recargue la página
    if (usuario.trim() === '' || password === '') {
      setError('Ingresa tu usuario y tu contraseña')
      return
    }

    // Objeto estructurado con lo capturado (lo pide la rúbrica: verlo por consola).
    // OJO: en un proyecto real NUNCA se imprime la contraseña; aquí es solo práctica.
    const datos = { rol, usuario, password, recordar }
    console.log('Datos del formulario de login:', datos)

    setError('')
    setEnviando(true) // feedback visual: el botón se deshabilita y cambia el texto
    try {
      await iniciarSesion(datos) // el componente NO hace fetch: llama al servicio
      const elegido = roles.find((r) => r.id === rol)
      navigate(elegido.ruta)
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
            <label htmlFor="usuario">Usuario</label>
            <input
              type="text"
              id="usuario"
              placeholder="Ingresa tu usuario"
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
      </div>
    </div>
  )
}

export default Login
