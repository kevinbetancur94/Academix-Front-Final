
import '../css/acudientes.css'

const hijos = [
  {
    id: 'juan',
    nombre: 'Juan',
    grado: 'Información académica por consultar',
  },
  {
    id: 'sofia',
    nombre: 'Sofía',
    grado: 'Información académica por consultar',
  },
  {
    id: 'carlos',
    nombre: 'Carlos',
    grado: 'Información académica por consultar',
  },
]

function AcudienteLista() {
  return (
    <main className="acudientes">
      <header className="acudientes-header">
        <span className="acudientes-etiqueta">ACADEMIX</span>
        <h1>Panel del acudiente</h1>
        <p>
          Consulta la información de tus hijos
          y accede a sus detalles académicos.
        </p>
      </header>

      <section className="acudientes-contenido">
        <h2>Mis hijos</h2>
        <p className="acudientes-descripcion">
          Selecciona un estudiante para consultar
          su información.
        </p>

        <div className="acudientes-lista">
          {hijos.map((hijo) => (
            <article className="acudiente-tarjeta" key={hijo.id}>
              <div className="acudiente-avatar" aria-hidden="true">
                {hijo.nombre.charAt(0)}
              </div>

              <div className="acudiente-info">
                <h3>{hijo.nombre}</h3>
                <p>{hijo.grado}</p>
              </div>

              <a
                className="acudiente-boton"
                href={`/acudiente/${hijo.id}`}
              >
                Ver detalle
              </a>
            </article>
          ))}
        </div>
      </section>
    </main>
  )
}

export default AcudienteLista
