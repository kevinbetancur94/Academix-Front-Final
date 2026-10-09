// ÚNICO lugar donde se define la URL del backend y el modo de datos.
// Para cambiar de desarrollo a producción: crear un archivo .env (ver .env.example)
// o modificar los valores por defecto de aquí. Ningún otro archivo debe escribir la URL.

// Vite entrega las variables de .env que empiezan con VITE_ en import.meta.env
export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api'

// Mientras no exista backend, trabajamos con datos de ejemplo (mock).
// Solo se desactiva cuando VITE_USAR_MOCK vale exactamente "false".
export const USAR_MOCK = import.meta.env.VITE_USAR_MOCK !== 'false'

// Tiempo (ms) que "tarda" la respuesta simulada, para ver los spinners de carga.
export const RETARDO_MOCK = 600
