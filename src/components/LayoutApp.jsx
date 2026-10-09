import { Outlet } from 'react-router-dom'
import Navbar from './Navbar.jsx'

// Plantilla de las páginas internas: barra de navegación arriba y,
// debajo, la página que corresponda a la URL (<Outlet />).
function LayoutApp() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  )
}

export default LayoutApp
