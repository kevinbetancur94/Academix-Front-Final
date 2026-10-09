import { useState, useEffect } from 'react'

// Hook personalizado: pide datos a un servicio y avisa si está cargando o falló.
//
//   const { datos, cargando, error } = useCargarDatos(obtenerHijo, 'juan')
//
// - cargar:     la función del servicio (ej. obtenerHijo)
// - argumento:  lo que se le pasa a esa función (ej. 'juan'). Si cambia, se vuelve a pedir.
export function useCargarDatos(cargar, argumento) {
  const [resultado, setResultado] = useState(null)

  // useEffect = "hacer algo cuando el componente aparece o cuando cambian [cargar, argumento]"
  useEffect(() => {
    let activo = true // evita actualizar el estado si el componente ya desapareció

    cargar(argumento)
      .then((datos) => {
        if (activo) setResultado({ argumento, datos, error: null })
      })
      .catch((err) => {
        if (activo) setResultado({ argumento, datos: null, error: err.message })
      })

    // Función de limpieza: se ejecuta antes de volver a pedir o al salir de la página.
    return () => {
      activo = false
    }
  }, [cargar, argumento])

  // Si todavía no hay resultado para este argumento, seguimos "cargando".
  const cargando = resultado === null || resultado.argumento !== argumento
  return {
    datos: cargando ? null : resultado.datos,
    error: cargando ? null : resultado.error,
    cargando,
  }
}
