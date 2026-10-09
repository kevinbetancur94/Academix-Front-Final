
import { Link, useParams } from 'react-router-dom'
import '../css/acudientes.css'

const estudiantes = {
  juan: {
    nombre: 'Juan',
    grado: 'Información académica por consultar',
  },
  sofia: {
    nombre: 'Sofía',
    grado: 'Información académica por consultar',
  },
  carlos: {
    nombre: 'Carlos',
    grado: 'Información académica por consultar',
  },
}

function DetalleHijo() {
  const { hijoId } = useParams()
  const hijo = estudiantes[hijoId]

  if (!hijo) {
    return (
      <main className="acudientes">
        <h1>Estudiante no encontrado</h1>
        <p>No encontramos información para este estudiante.</p>
        <Link to="/acudiente" className="acudiente-boton">
          Volver a mis hijos
        </Link>
      </main>
    )
  }

  return (
    <main className="acudientes">
      <header className="acudientes-header">
        <span className="acudientes-etiqueta">ACADEMIX</span>
        <h1>Detalle del estudiante</h1>
        <p>Consulta la información académica de tu hijo.</p>
      </header>

      <section className="acudientes-contenido">
        <article className="acudiente-tarjeta">
          <div className="acudiente-avatar" aria-hidden="true">
            {hijo.nombre.charAt(0)}
          </div>

          <div className="acudiente-info">
            <h2>{hijo.nombre}</h2>
            <p>{hijo.grado}</p>
          </div>
        </article>

        <div style={{ marginTop: '24px' }}>
          <h2>Información académica</h2>
          <p>
            Las notas, el grado y el desempeño académico
            estarán disponibles cuando se conecten los datos
            del estudiante.
          </p>
        </div>

        <Link
          to="/acudiente"
          className="acudiente-boton"
          style={{ display: 'inline-block', marginTop: '16px' }}
        >
          Volver a mis hijos
        </Link>
      </section>
    </main>
  )
}

export default DetalleHijo
