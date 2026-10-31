import { createBrowserRouter } from 'react-router-dom'
import LayoutApp from '../components/LayoutApp.jsx'
import RutaProtegida from '../components/RutaProtegida.jsx'
import Inicio from '../pages/Inicio.jsx'
import Login from '../pages/Login.jsx'
import Registro from '../pages/Registro.jsx'
import Recuperacion from '../pages/Recuperacion.jsx'
import VisualNotas from '../pages/VisualNotas.jsx'
import PanelDocente from '../pages/PanelDocente.jsx'
import AcudienteLista from '../pages/AcudienteLista.jsx'
import DetalleHijo from '../pages/DetalleHijo.jsx'
import Calendario from '../pages/Calendario.jsx'
import ErrorPage from '../pages/ErrorPage.jsx'

// Mapa de la aplicación en forma de OBJETOS (API moderna de react-router v6.4+).
// - path:     la URL
// - element:  el componente que se muestra
// - children: rutas anidadas (se dibujan dentro del <Outlet /> del padre)
export const router = createBrowserRouter([
  {
    // Ruta "padre" sin path: sirve para que TODAS las rutas compartan la página de error.
    errorElement: <ErrorPage />,
    children: [
      // --- Páginas públicas (sin barra de navegación) ---
      { path: '/', element: <Inicio /> },
      { path: '/login', element: <Login /> },
      { path: '/registro', element: <Registro /> },
      { path: '/recuperacion', element: <Recuperacion /> },

      // --- Páginas internas: cada grupo solo es accesible para su(s) rol(es) ---
      // RutaProtegida revisa la sesión; LayoutApp pone el Navbar de ese rol.
      {
        element: <LayoutApp />,
        children: [
          {
            element: <RutaProtegida roles={['estudiante']} />,
            children: [{ path: '/estudiante', element: <VisualNotas /> }],
          },
          {
            element: <RutaProtegida roles={['docente']} />,
            children: [{ path: '/docente', element: <PanelDocente /> }],
          },
          {
            element: <RutaProtegida roles={['acudiente']} />,
            children: [
              { path: '/acudiente', element: <AcudienteLista /> },
              { path: '/acudiente/:hijoId', element: <DetalleHijo /> }, // página de DETALLE (parámetro en la URL)
            ],
          },
          {
            // El calendario lo usan estudiantes (solo consultan) y docentes (también programan)
            element: <RutaProtegida roles={['estudiante', 'docente']} />,
            children: [{ path: '/calendario', element: <Calendario /> }],
          },
        ],
      },

      // Cualquier otra URL → página 404
      { path: '*', element: <ErrorPage /> },
    ],
  },
])
