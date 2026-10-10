import Encabezado from '../components/Encabezado.jsx'
import { calcularPromedio, calcularTendencia, nivelColor, resumenEstudiante } from '../utils/notas.js'
import '../css/visual-notas.css'

// Materias y notas del estudiante (datos de ejemplo)
const materias = [
  { nombre: 'Matemáticas', notas: [2.5, 2.8, 3.2] },
  { nombre: 'Español', notas: [4.0, 4.3, 4.5] },
  { nombre: 'Ciencias', notas: [3.8, 3.5, 3.4] },
  { nombre: 'Inglés', notas: [4.6, 4.8, 5.0] },
  { nombre: 'Sociales', notas: [2.6, 2.9, 2.7] },
]

// Flechas para mostrar si la nota va subiendo o bajando
const flechas = { sube: '↑ Sube', baja: '↓ Baja', estable: '→ Estable' }

function VisualNotas() {
  // resumenEstudiante viene de utils/notas.js: calcula promedio general y riesgo
  const resumen = resumenEstudiante(materias)

  return (
    <main className="visual-notas">
      <Encabezado nombre="Juan Pérez" rol="Estudiante · Grado 9°" />

      <div className="vn-contenido">
        <section className="vn-resumen">
          <article className="vn-tarjeta">
            <p className="vn-etiqueta">Promedio general</p>
            <p className="vn-valor">
              <span className={`vn-nota ${resumen.color}`}>{resumen.promedioGeneral}</span>
            </p>
          </article>

          <article className="vn-tarjeta">
            <p className="vn-etiqueta">Materias</p>
            <p className="vn-valor">{materias.length}</p>
          </article>

          <article className="vn-tarjeta">
            <p className="vn-etiqueta">Materias en riesgo</p>
            <p className="vn-valor">{resumen.materiasEnRiesgo.length}</p>
          </article>
        </section>

        {/* Este aviso solo aparece si el estudiante va perdiendo alguna materia */}
        {resumen.enRiesgo && (
          <p className="vn-alerta">
            Atención: vas perdiendo {resumen.materiasEnRiesgo.join(', ')}. Habla con tu docente.
          </p>
        )}

        <section className="vn-tarjeta">
          <h2>Mis notas por materia</h2>
          <div className="vn-tabla-contenedor">
            <table className="vn-tabla">
              <thead>
                <tr>
                  <th>Materia</th>
                  <th>Notas</th>
                  <th>Promedio</th>
                  <th>Tendencia</th>
                </tr>
              </thead>
              <tbody>
                {materias.map((m) => {
                  const promedio = calcularPromedio(m.notas)
                  return (
                    <tr key={m.nombre}>
                      <td>{m.nombre}</td>
                      <td>{m.notas.join(' · ')}</td>
                      <td>
                        <span className={`vn-nota ${nivelColor(promedio)}`}>{promedio}</span>
                      </td>
                      <td>{flechas[calcularTendencia(m.notas)]}</td>
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

export default VisualNotas