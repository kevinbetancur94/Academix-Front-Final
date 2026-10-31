import { useState } from 'react'
import Encabezado from '../components/Encabezado.jsx'
import NotaBadge from '../components/NotaBadge.jsx'
import Cargando from '../components/Cargando.jsx'
import MensajeError from '../components/MensajeError.jsx'
import { useCargarDatos } from '../hooks/useCargarDatos.js'
import { useAuth } from '../hooks/useAuth.js'
import { obtenerMateriasDocente, obtenerEstudiantesDocente, guardarCalificaciones } from '../services/notasService.js'
import { calcularPromedio, esNotaValida } from '../utils/notas.js'
import '../css/panel-docente.css'

// Convierte lo que se escribió en el campo (texto) a número. '' → null (sin nota), '4,5' → 4.5
function aNumero(texto) {
  if (texto === '') return null
  return Number(texto.replace(',', '.'))
}

// Un campo es inválido si tiene algo escrito y no es una nota entre 1.0 y 5.0
function notaInvalida(texto) {
  const n = aNumero(texto)
  return n !== null && !esNotaValida(n)
}

// 1) Este componente pide las materias del docente (spinner / error).
function PanelDocente() {
  const { usuario } = useAuth()
  const { datos: materias, cargando, error } = useCargarDatos(obtenerMateriasDocente, usuario.id)

  if (cargando) return <div className="pg-panel-docente"><Cargando texto="Cargando tu panel..." /></div>
  if (error) return <div className="pg-panel-docente"><MensajeError mensaje={error} /></div>
  if (materias.length === 0) {
    return <div className="pg-panel-docente"><MensajeError mensaje="Todavía no tienes materias asignadas." /></div>
  }

  return <PanelContenido materias={materias} nombreDocente={usuario.nombre} />
}

// 2) Maneja la materia elegida y pide los estudiantes de esa materia.
function PanelContenido({ materias, nombreDocente }) {
  const [materiaId, setMateriaId] = useState(materias[0].id)
  const { datos: estudiantes, cargando, error } = useCargarDatos(obtenerEstudiantesDocente, materiaId)

  return (
    <div className="pg-panel-docente">
      <Encabezado nombre={nombreDocente} rol="Docente" />

      <main className="contenido">
        <h1>Panel docente</h1>

        <div className="selector-materia">
          <label htmlFor="materia">Materia y grupo</label>
          <select id="materia" value={materiaId} onChange={(e) => setMateriaId(e.target.value)}>
            {materias.map((m) => (
              <option key={m.id} value={m.id}>{m.nombre}</option>
            ))}
          </select>
        </div>

        {cargando && <Cargando texto="Cargando estudiantes..." />}
        {error && <MensajeError mensaje={error} />}
        {/* key={materiaId}: al cambiar de materia, la tabla se reinicia con los datos nuevos */}
        {estudiantes && <TablaCalificaciones key={materiaId} materiaId={materiaId} estudiantes={estudiantes} />}
      </main>
    </div>
  )
}

// 3) La tabla editable. Usa los datos que llegaron como ESTADO INICIAL y los modifica al escribir.
function TablaCalificaciones({ materiaId, estudiantes }) {
  const [filas, setFilas] = useState(() =>
    estudiantes.map((e) => ({
      id: e.id,
      nombre: e.nombre,
      notas: e.notas.map((n) => (n === null ? '' : String(n))),
      observacion: e.observacion,
    })),
  )
  const [guardando, setGuardando] = useState(false)
  const [mensaje, setMensaje] = useState('')

  // Nunca se modifica el estado directamente: siempre se crea una copia nueva con .map()
  function cambiarNota(id, indice, valor) {
    setMensaje('')
    setFilas(filas.map((f) =>
      f.id === id ? { ...f, notas: f.notas.map((n, i) => (i === indice ? valor : n)) } : f,
    ))
  }

  function cambiarObservacion(id, valor) {
    setMensaje('')
    setFilas(filas.map((f) => (f.id === id ? { ...f, observacion: valor } : f)))
  }

  const hayErrores = filas.some((f) => f.notas.some(notaInvalida))

  async function guardar() {
    setGuardando(true)
    setMensaje('')
    try {
      const calificaciones = filas.map((f) => ({
        id: f.id,
        notas: f.notas.map(aNumero),
        observacion: f.observacion,
      }))
      console.log('Calificaciones a guardar:', { materiaId, calificaciones })
      await guardarCalificaciones({ materiaId, calificaciones })
      setMensaje('✅ Calificaciones guardadas correctamente')
    } catch (err) {
      setMensaje(`❌ ${err.message}`)
    } finally {
      setGuardando(false)
    }
  }

  return (
    <>
      <div className="tabla-scroll">
        <table>
          <thead>
            <tr>
              <th>Estudiante</th>
              <th>Nota 1</th>
              <th>Nota 2</th>
              <th>Nota 3</th>
              <th>Promedio</th>
              <th>Observaciones</th>
            </tr>
          </thead>
          <tbody>
            {filas.map((f) => {
              const validas = f.notas.filter((n) => n !== '' && !notaInvalida(n)).map(aNumero)
              return (
                <tr key={f.id}>
                  <td>{f.nombre}</td>
                  {f.notas.map((n, i) => (
                    <td key={i}>
                      <input
                        type="text"
                        inputMode="decimal"
                        className={`campo-nota ${notaInvalida(n) ? 'invalida' : ''}`}
                        aria-label={`Nota ${i + 1} de ${f.nombre}`}
                        value={n}
                        onChange={(e) => cambiarNota(f.id, i, e.target.value)}
                      />
                    </td>
                  ))}
                  <td>{validas.length > 0 ? <NotaBadge nota={calcularPromedio(validas)} /> : <NotaBadge nota={null} />}</td>
                  <td>
                    <input
                      type="text"
                      className="campo-obs"
                      aria-label={`Observación de ${f.nombre}`}
                      value={f.observacion}
                      onChange={(e) => cambiarObservacion(f.id, e.target.value)}
                    />
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {hayErrores && <p className="aviso-error">Hay notas fuera del rango 1.0 – 5.0. Corrígelas para poder guardar.</p>}
      {mensaje && <p className="aviso-ok">{mensaje}</p>}

      <button className="btn-guardar" onClick={guardar} disabled={hayErrores || guardando}>
        {guardando ? 'Guardando...' : 'Guardar calificaciones'}
      </button>
    </>
  )
}

export default PanelDocente
