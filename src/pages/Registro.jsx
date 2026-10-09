import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { registrarUsuario } from '../services/authService.js'
import '../css/registro.css'

const departamentos = ['Antioquia', 'Cundinamarca', 'Valle del Cauca', 'Santander', 'Bolivar']
const ciudades = ['Medellin', 'Bogota', 'Cali', 'Bucaramanga', 'Cartagena']
const roles = [
  { valor: 'estudiante', texto: 'Estudiante' },
  { valor: 'docente', texto: 'Docente' },
  { valor: 'acudiente', texto: 'Acudiente' },
]

const formularioVacio = {
  nombre: '',
  correo: '',
  telefono: '',
  password: '',
  confirmar: '',
  rol: 'estudiante',
  departamento: '',
  ciudad: '',
}

function Registro() {
  // Un solo estado (un objeto) guarda todos los campos del formulario.
  const [form, setForm] = useState(formularioVacio)
  const [error, setError] = useState('')
  const [enviando, setEnviando] = useState(false)
  const [exito, setExito] = useState(false)
  const navigate = useNavigate()

  // Una sola función sirve para TODOS los campos: usa el "name" del input.
  function manejarCambio(evento) {
    const { name, value } = evento.target
    setForm({ ...form, [name]: value }) // copia el objeto y cambia solo ese campo
  }

  async function manejarEnvio(evento) {
    evento.preventDefault()
    if (form.password !== form.confirmar) {
      setError('Las contraseñas no coinciden')
      return
    }
    if (form.password.length < 6) {
      setError('La contraseña debe tener mínimo 6 caracteres')
      return
    }
    setError('')

    // Objeto estructurado con todos los campos (lo pide la rúbrica: verlo por consola).
    console.log('Datos del formulario de registro:', form)

    setEnviando(true)
    try {
      await registrarUsuario(form) // llamada al servicio (no hay fetch aquí)
      setExito(true)
      setTimeout(() => navigate('/login'), 1500) // mostramos el éxito y luego pasamos al login
    } catch (err) {
      setError(err.message)
      setEnviando(false)
    }
  }

  return (
    <div className="pg-registro">
      <div className="container">
        <div className="logo">
          <img src="/academixlogo.jpg" alt="Logo de Academix" />
        </div>
        <h2>Registro de Usuario</h2>
        <form className="formulario" onSubmit={manejarEnvio}>
          <input type="text" name="nombre" placeholder="Nombre Completo" value={form.nombre} onChange={manejarCambio} required />
          <input type="email" name="correo" placeholder="Correo Electronico" value={form.correo} onChange={manejarCambio} required />
          <input type="tel" name="telefono" placeholder="Telefono" value={form.telefono} onChange={manejarCambio} required />
          <input type="password" name="password" placeholder="Contraseña" value={form.password} onChange={manejarCambio} required />
          <input type="password" name="confirmar" placeholder="Confirmar Contraseña" value={form.confirmar} onChange={manejarCambio} required />

          <div className="form-group">
            <label>Selecciona tu Rol:</label>
            <div className="role-selector">
              {roles.map((r) => (
                <label key={r.valor} className="role-option">
                  <input
                    type="radio"
                    name="rol"
                    value={r.valor}
                    checked={form.rol === r.valor}
                    onChange={manejarCambio}
                  />
                  <span>{r.texto}</span>
                </label>
              ))}
            </div>
          </div>

          <label htmlFor="departamento">Departamento</label>
          <select id="departamento" name="departamento" value={form.departamento} onChange={manejarCambio}>
            <option value="">Seleccione Departamento</option>
            {departamentos.map((d) => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>

          <label htmlFor="ciudad">Ciudad</label>
          <select id="ciudad" name="ciudad" value={form.ciudad} onChange={manejarCambio}>
            <option value="">Seleccione Ciudad</option>
            {ciudades.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>

          {error && <p className="mensaje-error">{error}</p>}
          {exito && <p className="mensaje-exito">✓ ¡Registro exitoso! Te llevamos al inicio de sesión...</p>}

          <button type="submit" disabled={enviando}>
            {enviando ? 'Registrando...' : 'Registrarse'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default Registro
