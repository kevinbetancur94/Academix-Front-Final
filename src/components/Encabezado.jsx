// Encabezado con el logo y los datos del usuario.
// Lo usan tres páginas (docente, estudiante y acudiente), así que lo escribimos UNA sola vez.
// "props" = los datos que le pasamos desde afuera: <Encabezado nombre="..." rol="..." />
function Encabezado({ nombre, rol }) {
  return (
    <div className="header">
      <div className="header-logo">
        <img src="/academixlogo.jpg" alt="Academix Logo" />
      </div>
      <div className="user-info">
        <div className="name">{nombre}</div>
        <div className="role">{rol}</div>
      </div>
    </div>
  )
}

export default Encabezado
