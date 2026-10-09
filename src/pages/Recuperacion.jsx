import { useState } from 'react'
import { Link } from 'react-router-dom'
import { recuperarPassword } from '../services/authService.js'
import '../css/recuperacion.css'

function Recuperacion() {
  const [email, setEmail] = useState('')
  const [enviado, setEnviado] = useState(false)
  const [enviando, setEnviando] = useState(false)
  const [error, setError] = useState('')

  async function enviarCorreo(evento) {
    evento.preventDefault()
    if (email.trim() === '') {
      setError('Por favor ingresa tu correo electrónico')
      return
    }
    setError('')
    console.log('Datos del formulario de recuperación:', { email })

    setEnviando(true)
    try {
      await recuperarPassword(email)
      setEnviado(true)
      setEmail('')
      // A los 5 segundos ocultamos el mensaje de éxito
      setTimeout(() => setEnviado(false), 5000)
    } catch (err) {
      setError(err.message)
    }
    setEnviando(false)
  }

  return (
    <div className="pg-recuperacion">
      <div className="contenedor">
        <div className="logo">
          <img src="/academixlogo.jpg" alt="ACADEMIX Logo" />
        </div>
        <h1 className="titulo">¿Olvidaste tu contraseña?</h1>
        <p className="descripcion">
          Ingresa tu correo electrónico y te enviaremos instrucciones para recuperar tu contraseña
        </p>

        {/* Render condicional: este bloque solo existe si enviado === true */}
        {enviado && (
          <div className="mensaje-exito" style={{ display: 'block' }}>
            ✓ ¡Correo enviado! Revisa tu bandeja de entrada
          </div>
        )}

        {error && <div className="mensaje-error">{error}</div>}

        <form onSubmit={enviarCorreo}>
          <div className="grupo-input">
            <label htmlFor="email">Correo Electrónico:</label>
            <input
              type="email"
              id="email"
              placeholder="ejemplo@correo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <button type="submit" className="boton" disabled={enviando}>
            {enviando ? 'Enviando...' : 'Enviar Enlace de Recuperación'}
          </button>
        </form>
        <div className="enlaces">
          <Link to="/login">← Volver al inicio de sesión</Link>
        </div>
      </div>
    </div>
  )
}

export default Recuperacion
