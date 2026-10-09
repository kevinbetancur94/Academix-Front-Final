import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import '../css/navbar.css'

// Los enlaces del menú. Para agregar una página al menú solo se agrega una línea aquí.
const enlaces = [
  { to: '/', texto: 'Inicio' },
  { to: '/estudiante', texto: 'Mis Notas' },
  { to: '/docente', texto: 'Docente' },
  { to: '/acudiente', texto: 'Acudiente' },
  { to: '/calendario', texto: 'Calendario' },
  { to: '/login', texto: 'Salir' },
]

function Navbar() {
  // En celulares el menú está cerrado y se abre con el botón ☰
  const [abierto, setAbierto] = useState(false)

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
        </ul>
      </div>
    </nav>
  )
}

export default Navbar
