// Reporte analítico de Academix (docente). El HTML lo genera el proyecto de Python
// (taller_academix/generar_reporte.py) a partir de la API y se publica en public/reportes/.
import '../css/reportes.css'

function Reportes() {
  return (
    <div className="reportes-fondo">
    <main className="reportes">
      <div className="reportes-barra">
        <h1>Reporte analítico</h1>
        <a href="/reportes/index.html" target="_blank" rel="noreferrer">
          Abrir en una pestaña nueva
        </a>
      </div>
      <iframe className="reportes-frame" src="/reportes/index.html" title="Reporte analítico de Academix" />
    </main>
    </div>
  )
}

export default Reportes
