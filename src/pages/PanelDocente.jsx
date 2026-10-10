import { useState } from 'react'
import Encabezado from '../components/Encabezado.jsx'
import { calcularPromedio, esNotaValida, nivelColor, NOTA_APROBATORIA } from '../utils/notas.js'
import '../css/panel-docente.css'

// Estudiantes del curso (datos de ejemplo)
const estudiantesIniciales = [
  { id: 1, nombre: 'Juan Pérez', notas: [3.5, 4.0, 4.2] },
  { id: 2, nombre: 'Sofía Gómez', notas: [4.8, 4.5, 5.0] },
  { id: 3, nombre: 'Carlos Ruiz', notas: [2.5, 2.8, 3.0] },
]

function PanelDocente() {
  // useState guarda los datos que pueden cambiar en la página
  const [estudiantes, setEstudiantes] = useState(estudiantesIniciales)
  const [formulario, setFormulario] = useState({ estudianteId: '1', nota: '' })
  const [mensaje, setMensaje] = useState(null)

  // Formulario controlado: cada vez que se escribe, se actualiza el estado
  function manejarCambio(event) {
    const { name, value } = event.target
    setFormulario({ ...formulario, [name]: value })
  }

  function manejarEnvio(event) {
    event.preventDefault() // evita que la página se recargue
    console.log('Nota enviada:', formulario)

    const nota = Number(formulario.nota)
    if (!esNotaValida(nota)) {
      setMensaje({ tipo: 'error', texto: 'La nota debe estar entre 1.0 y 5.0' })
      return
    }

    // Agrega la nota al estudiante elegido
    setEstudiantes(
      estudiantes.map((e) =>
        e.id === Number(formulario.estudianteId) ? { ...e, notas: [...e.notas, nota] } : e
      )
    )
    setFormulario({ ...formulario, nota: '' })
    setMensaje({ tipo: 'exito', texto: 'Nota registrada correctamente' })
  }

  return (
    <main className="panel-docente">
      <Encabezado nombre="Profesora Ana López" rol="Docente" />

      <div className="panel-contenido">
        <section className="panel-tarjeta">
          <h2>Registrar nota</h2>
          <form className="panel-formulario" onSubmit={manejarEnvio}>
            <label>
              Estudiante
              <select name="estudianteId" value={formulario.estudianteId} onChange={manejarCambio}>
                {estudiantes.map((e) => (
                  <option key={e.id} value={e.id}>
                    {e.nombre}
                  </option>
                ))}
              </select>
            </label>

            <label>
              Nota (1.0 a 5.0)
              <input
                type="number"
                name="nota"
                step="0.1"
                min="1"
                max="5"
                value={formulario.nota}
                onChange={manejarCambio}
                required
              />
            </label>

            <button type="submit">Guardar nota</button>
          </form>

          {mensaje && <p className={`panel-mensaje ${mensaje.tipo}`}>{mensaje.texto}</p>}
        </section>

        <section className="panel-tarjeta">
          <h2>Mis estudiantes</h2>
          <div className="panel-tabla-contenedor">
            <table className="panel-tabla">
              <thead>
                <tr>
                  <th>Estudiante</th>
                  <th>Notas</th>
                  <th>Promedio</th>
                  <th>Estado</th>
                </tr>
              </thead>
              <tbody>
                {estudiantes.map((e) => {
                  const promedio = calcularPromedio(e.notas)
                  return (
                    <tr key={e.id}>
                      <td>{e.nombre}</td>
                      <td>{e.notas.join(' · ')}</td>
                      <td>
                        <span className={`promedio ${nivelColor(promedio)}`}>{promedio}</span>
                      </td>
                      <td>{promedio >= NOTA_APROBATORIA ? 'Aprobando' : 'En riesgo'}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </main>
  )
}

export default PanelDocente