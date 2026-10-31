import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth.js'
import { ENLACES_POR_ROL, NOMBRE_ROL } from '../utils/roles.js'
import '../css/navbar.css'

function Navbar() {
  // En celulares el menú está cerrado y se abre con el botón ☰
  const [abierto, setAbierto] = useState(false)
  const { usuario, cerrar } = useAuth()
  const navigate = useNavigate()

  // Cada rol ve SOLO sus enlaces (definidos en utils/roles.js).
  // Para agregar una página al menú de un rol, se agrega una línea allá.
  const enlaces = [{ to: '/', texto: 'Inicio' }, ...(ENLACES_POR_ROL[usuario.rol] ?? [])]

  function salir() {
    cerrar()
    navigate('/login')
  }

  return (
    <nav className="ui-navbar">
      <div className="ui-navbar-inner">
        <NavLink to="/" className="ui-navbar-brand">
          <img src="/academixlogo.jpg" alt="Academix" />
        </NavLink>

        <button
          className="ui-navbar-toggle"
          aria-label="Abrir menú"
          aria-expanded={abierto}
          onClick={() => setAbierto(!abierto)}
        >
          ☰
        </button>

        <ul className={`ui-navbar-links ${abierto ? 'abierto' : ''}`}>
          {enlaces.map((e) => (
            // NavLink agrega la clase "active" automáticamente al enlace de la página actual
            <li key={e.to}>
              <NavLink to={e.to} end={e.to === '/'} onClick={() => setAbierto(false)}>
                {e.texto}
              </NavLink>
            </li>
          ))}
          <li className="ui-navbar-usuario">
            {usuario.nombre} · {NOMBRE_ROL[usuario.rol]}
          </li>
          <li>
            <button className="ui-navbar-salir" onClick={salir}>
              Salir
            </button>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar
