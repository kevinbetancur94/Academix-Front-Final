import { useState } from 'react'
import Cargando from '../components/Cargando.jsx'
import MensajeError from '../components/MensajeError.jsx'
import { useCargarDatos } from '../hooks/useCargarDatos.js'
import { materias, tipos, grados } from '../data/calendario.js'
import { obtenerTareas, obtenerFestivos, crearTarea } from '../services/calendarioService.js'
import { iniciarSesion } from '../services/authService.js'
import '../css/calendario.css'

const NOMBRES_MES = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']
const DIAS_SEMANA = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb']

// Las fechas se manejan como texto 'AAAA-MM-DD' (igual que el <input type="date">).
function claveFecha(anio, mes, dia) {
  return `${anio}-${String(mes + 1).padStart(2, '0')}-${String(dia).padStart(2, '0')}`
}

const hoy = new Date()
const CLAVE_HOY = claveFecha(hoy.getFullYear(), hoy.getMonth(), hoy.getDate())

// Construye las celdas de un mes: días del mes anterior (para rellenar), del mes, y del siguiente.
function construirDias(anio, mes) {
  const primerDiaSemana = new Date(anio, mes, 1).getDay() // 0 = domingo
  const diasDelMes = new Date(anio, mes + 1, 0).getDate()
  const diasMesAnterior = new Date(anio, mes, 0).getDate()
  const celdas = []

  for (let i = primerDiaSemana - 1; i >= 0; i--) {
    const fecha = new Date(anio, mes - 1, diasMesAnterior - i)
    celdas.push({ numero: fecha.getDate(), clave: claveFecha(fecha.getFullYear(), fecha.getMonth(), fecha.getDate()), otroMes: true })
  }
  for (let d = 1; d <= diasDelMes; d++) {
    celdas.push({ numero: d, clave: claveFecha(anio, mes, d), otroMes: false })
  }
  let siguiente = 1
  while (celdas.length % 7 !== 0) {
    const fecha = new Date(anio, mes + 1, siguiente++)
    celdas.push({ numero: fecha.getDate(), clave: claveFecha(fecha.getFullYear(), fecha.getMonth(), fecha.getDate()), otroMes: true })
  }
  return celdas
}

const tareaVacia = { titulo: '', descripcion: '', materia: '', tipo: '', grado: '', fecha: '', observaciones: '' }

// Igual que en el panel docente: 1) este componente pide los datos, 2) CalendarioContenido los usa.
function Calendario() {
  const tareas = useCargarDatos(obtenerTareas)
  const festivos = useCargarDatos(obtenerFestivos)

  if (tareas.cargando || festivos.cargando) {
    return <div className="pg-calendario"><Cargando texto="Cargando calendario..." /></div>
  }
  const error = tareas.error || festivos.error
  if (error) return <div className="pg-calendario"><MensajeError mensaje={error} /></div>

  return <CalendarioContenido tareasIniciales={tareas.datos} festivos={festivos.datos} />
}

function CalendarioContenido({ tareasIniciales, festivos }) {
  // El calendario arranca en octubre de 2025 porque ahí están los datos de ejemplo.
  const [vista, setVista] = useState({ anio: 2025, mes: 9 })
  const [usuario, setUsuario] = useState(null) // null | { tipo: 'estudiante', grado } | { tipo: 'profesor' }
  const [modal, setModal] = useState(null) // null | 'estudiante' | 'profesor' | 'tarea'
  const [login, setLogin] = useState({ id: '', password: '', grado: '' })
  const [tareas, setTareas] = useState(tareasIniciales)
  const [nuevaTarea, setNuevaTarea] = useState(tareaVacia)
  const [filtros, setFiltros] = useState({ materia: null, tipo: null, grado: null })
  const [alerta, setAlerta] = useState(null)
  const [enviando, setEnviando] = useState(false)

  const esProfesor = usuario?.tipo === 'profesor'

  // --- Navegación entre meses ---
  function cambiarMes(delta) {
    const fecha = new Date(vista.anio, vista.mes + delta, 1)
    setVista({ anio: fecha.getFullYear(), mes: fecha.getMonth() })
  }

  // --- Sesión ---
  function abrirModal(nombre) {
    setLogin({ id: '', password: '', grado: '' })
    setModal(nombre)
  }

  async function ingresar(tipo) {
    if (login.id.trim() === '' || login.password === '' || (tipo === 'estudiante' && login.grado === '')) {
      setAlerta('Completa todos los campos para ingresar')
      return
    }
    console.log('Datos del formulario de ingreso al calendario:', { tipo, ...login })
    setEnviando(true)
    try {
      await iniciarSesion({ usuario: login.id, password: login.password, rol: tipo })
      setUsuario(tipo === 'estudiante' ? { tipo, grado: login.grado } : { tipo })
      setModal(null)
    } catch (err) {
      setAlerta(err.message)
    }
    setEnviando(false)
  }

  function cerrarSesion() {
    setUsuario(null)
    setFiltros({ materia: null, tipo: null, grado: null })
  }

  // --- Filtros: al hacer clic en una opción activa se desactiva ---
  function alternarFiltro(campo, valor) {
    setFiltros({ ...filtros, [campo]: filtros[campo] === valor ? null : valor })
  }

  // --- Tareas ---
  async function agregarTarea() {
    const { titulo, materia, tipo, grado, fecha } = nuevaTarea
    if (!titulo.trim() || !materia || !tipo || !grado || !fecha) {
      setAlerta('Completa título, materia, tipo, grado y fecha de entrega')
      return
    }
    console.log('Datos del formulario de nueva tarea:', nuevaTarea)
    setEnviando(true)
    try {
      const creada = await crearTarea(nuevaTarea) // el servicio devuelve la tarea con su id
      setTareas([...tareas, creada])
      setNuevaTarea(tareaVacia)
      setModal(null)
    } catch (err) {
      setAlerta(err.message)
    }
    setEnviando(false)
  }

  // Tareas que ve la persona: el estudiante solo las de su grado; el profesor puede filtrar por grado.
  const tareasVisibles = tareas
    .filter((t) => (usuario?.tipo === 'estudiante' ? t.grado === usuario.grado : true))
    .filter((t) => !filtros.materia || t.materia === filtros.materia)
    .filter((t) => !filtros.tipo || t.tipo === filtros.tipo)
    .filter((t) => !filtros.grado || t.grado === filtros.grado)
    .sort((a, b) => a.fecha.localeCompare(b.fecha))

  const fechasConTareas = new Set(tareasVisibles.map((t) => t.fecha))
  const fechasFestivas = new Set(festivos.map((f) => f.fecha))
  const dias = construirDias(vista.anio, vista.mes)

  return (
    <div className="pg-calendario">
      <header>
        <div className="header-content">
          <div className="header-logo">
            <img src="/academixlogo.jpg" alt="Academix Logo" />
          </div>
          {usuario ? (
            <div className="user-info" style={{ display: 'flex' }}>
              <span className="user-badge">
                {esProfesor ? '👩‍🏫 Profesor' : `👨‍🎓 Estudiante - ${usuario.grado}° Grado`}
              </span>
              <button className="logout-btn" onClick={cerrarSesion}>Cerrar Sesión</button>
            </div>
          ) : (
            <div className="auth-buttons">
              <button className="btn btn-primary" onClick={() => abrirModal('estudiante')}>Ingreso Estudiante</button>
              <button className="btn btn-secondary" onClick={() => abrirModal('profesor')}>Ingreso Profesor</button>
            </div>
          )}
        </div>
      </header>

      <div className="container">
        {!usuario && (
          <div className="welcome-section">
            <h1>¡Hola! Bienvenidos a tu Calendario Escolar</h1>
            <p>Ingresa tu documento de identificación y selecciona tu grado, luego dale <strong style={{ color: '#00d4ff' }}>Ingresar</strong></p>
            <div className="cards-container">
              <div className="info-card">
                <div className="icon">👨‍🎓</div>
                <h3>Estudiantes</h3>
                <p>Consulta tus tareas y fechas de entrega organizadas por materia</p>
              </div>
              <div className="info-card">
                <div className="icon">👩‍🏫</div>
                <h3>Profesores</h3>
                <p>Gestiona y programa las actividades escolares</p>
              </div>
            </div>
          </div>
        )}

        <div className={`dashboard ${usuario ? 'active' : ''}`}>
          <div className="calendar-container">
            <div className="top-section">
              <div className="sidebar">
                <FiltroLista titulo="📚 Filtrar por Materia" opciones={materias} activo={filtros.materia} onElegir={(v) => alternarFiltro('materia', v)} />
                <FiltroLista titulo="🎯 Filtrar por Tipo" opciones={tipos} activo={filtros.tipo} onElegir={(v) => alternarFiltro('tipo', v)} />
                {esProfesor && (
                  <FiltroLista titulo="👥 Filtrar por Grado" opciones={grados} activo={filtros.grado} onElegir={(v) => alternarFiltro('grado', v)} formato={(g) => `${g}° Grado`} />
                )}
                <div className="filter-section">
                  <h3>🇨🇴 Festivos Colombia 2025</h3>
                  {festivos.map((f) => (
                    <div className="holiday-item" key={f.fecha}>
                      <div className="holiday-date">{f.fecha.slice(8)}/{f.fecha.slice(5, 7)}</div>
                      <div className="holiday-name">{f.nombre}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="calendar-main">
                <div className="calendar-header">
                  <div className="calendar-month">{NOMBRES_MES[vista.mes]} {vista.anio}</div>
                  <div className="calendar-nav">
                    <button className="nav-btn" onClick={() => cambiarMes(-1)}>← Anterior</button>
                    <button className="nav-btn" onClick={() => cambiarMes(1)}>Siguiente →</button>
                  </div>
                </div>
                <div className="calendar-grid">
                  {DIAS_SEMANA.map((d) => (
                    <div className="calendar-day-header" key={d}>{d}</div>
                  ))}
                </div>
                <div className="calendar-grid" style={{ marginTop: '-6px' }}>
                  {dias.map((d) => {
                    const clases = ['calendar-day']
                    if (d.otroMes) clases.push('other-month')
                    if (d.clave === CLAVE_HOY) clases.push('today')
                    if (fechasFestivas.has(d.clave)) clases.push('holiday')
                    if (fechasConTareas.has(d.clave)) clases.push('has-tasks')
                    return <div key={d.clave} className={clases.join(' ')}>{d.numero}</div>
                  })}
                </div>
              </div>
            </div>

            <div className="tasks-section-full">
              <h3>📝 Tareas Próximas</h3>
              <div className="tasks-list">
                {tareasVisibles.length === 0 && <p>No hay tareas para mostrar.</p>}
                {tareasVisibles.map((t) => (
                  <div className="task-card" key={t.id}>
                    <div className="task-title">{t.titulo}</div>
                    <div className="task-meta">
                      <span className="tag tag-subject">{t.materia}</span>
                      <span className="tag tag-type">{t.tipo}</span>
                      <span className="tag">{t.grado}° Grado</span>
                      <span className="tag">📅 {t.fecha.slice(8)}/{t.fecha.slice(5, 7)}/{t.fecha.slice(0, 4)}</span>
                    </div>
                    {t.descripcion && <p>{t.descripcion}</p>}
                    {t.observaciones && <div className="task-observations">📌 {t.observaciones}</div>}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal de ingreso (estudiante o profesor) */}
      {(modal === 'estudiante' || modal === 'profesor') && (
        <div className="modal active">
          <div className="modal-content">
            <span className="close-modal" onClick={() => setModal(null)}>&times;</span>
            <div className="modal-header">{modal === 'estudiante' ? 'Ingreso Estudiante' : 'Ingreso Profesor'}</div>
            <div className="form-group">
              <label>Documento de Identidad</label>
              <input type="text" placeholder="Ej: 123456789" value={login.id} onChange={(e) => setLogin({ ...login, id: e.target.value })} />
            </div>
            <div className="form-group">
              <label>Contraseña</label>
              <input type="password" placeholder="Ingresa tu contraseña" value={login.password} onChange={(e) => setLogin({ ...login, password: e.target.value })} />
            </div>
            {modal === 'estudiante' && (
              <div className="form-group">
                <label>Grado</label>
                <select value={login.grado} onChange={(e) => setLogin({ ...login, grado: e.target.value })}>
                  <option value="">Selecciona tu grado</option>
                  {grados.map((g) => (
                    <option key={g} value={g}>{g}° Grado</option>
                  ))}
                </select>
              </div>
            )}
            <button className="btn btn-primary" style={{ width: '100%', marginTop: '10px' }} onClick={() => ingresar(modal)} disabled={enviando}>
              {enviando ? 'Ingresando...' : 'Ingresar'}
            </button>
          </div>
        </div>
      )}

      {/* Modal para agregar tarea (solo profesor) */}
      {modal === 'tarea' && (
        <div className="modal active">
          <div className="modal-content">
            <span className="close-modal" onClick={() => setModal(null)}>&times;</span>
            <div className="modal-header">Agregar Nueva Tarea</div>
            <div className="form-group">
              <label>Título de la Tarea</label>
              <input type="text" placeholder="Ej: Ensayo sobre la Revolución" value={nuevaTarea.titulo} onChange={(e) => setNuevaTarea({ ...nuevaTarea, titulo: e.target.value })} />
            </div>
            <div className="form-group">
              <label>Descripción</label>
              <textarea placeholder="Detalles de la tarea..." value={nuevaTarea.descripcion} onChange={(e) => setNuevaTarea({ ...nuevaTarea, descripcion: e.target.value })} />
            </div>
            <CampoSelect etiqueta="Materia" vacio="Selecciona una materia" opciones={materias} valor={nuevaTarea.materia} onCambio={(v) => setNuevaTarea({ ...nuevaTarea, materia: v })} />
            <CampoSelect etiqueta="Tipo de Actividad" vacio="Selecciona el tipo" opciones={tipos} valor={nuevaTarea.tipo} onCambio={(v) => setNuevaTarea({ ...nuevaTarea, tipo: v })} />
            <CampoSelect etiqueta="Grado" vacio="Selecciona el grado" opciones={grados} formato={(g) => `${g}° Grado`} valor={nuevaTarea.grado} onCambio={(v) => setNuevaTarea({ ...nuevaTarea, grado: v })} />
            <div className="form-group">
              <label>Fecha de Entrega</label>
              <input type="date" value={nuevaTarea.fecha} onChange={(e) => setNuevaTarea({ ...nuevaTarea, fecha: e.target.value })} />
            </div>
            <div className="form-group">
              <label>Observaciones (Opcional)</label>
              <textarea placeholder="Observaciones importantes..." value={nuevaTarea.observaciones} onChange={(e) => setNuevaTarea({ ...nuevaTarea, observaciones: e.target.value })} />
            </div>
            <button className="btn btn-primary" style={{ width: '100%', marginTop: '10px' }} onClick={agregarTarea} disabled={enviando}>
              {enviando ? 'Guardando...' : 'Agregar Tarea'}
            </button>
          </div>
        </div>
      )}

      {/* Botón flotante "+" (solo profesor) */}
      {esProfesor && (
        <button className="add-task-btn" style={{ display: 'flex' }} onClick={() => setModal('tarea')}>+</button>
      )}

      {/* Modal de alerta */}
      {alerta && (
        <div className="alert-modal active">
          <div className="alert-content">
            <div className="alert-icon">⚠️</div>
            <div className="alert-message">{alerta}</div>
            <button className="alert-btn" onClick={() => setAlerta(null)}>Entendido</button>
          </div>
        </div>
      )}
    </div>
  )
}

// Componentes pequeños para no repetir el mismo bloque varias veces.
// Los dejamos en este archivo porque solo los usa el calendario.
function FiltroLista({ titulo, opciones, activo, onElegir, formato = (x) => x }) {
  return (
    <div className="filter-section">
      <h3>{titulo}</h3>
      {opciones.map((o) => (
        <div key={o} className={`filter-option ${activo === o ? 'active' : ''}`} onClick={() => onElegir(o)}>
          {formato(o)}
        </div>
      ))}
    </div>
  )
}

function CampoSelect({ etiqueta, vacio, opciones, valor, onCambio, formato = (x) => x }) {
  return (
    <div className="form-group">
      <label>{etiqueta}</label>
      <select value={valor} onChange={(e) => onCambio(e.target.value)}>
        <option value="">{vacio}</option>
        {opciones.map((o) => (
          <option key={o} value={o}>{formato(o)}</option>
        ))}
      </select>
    </div>
  )
}

export default Calendario
