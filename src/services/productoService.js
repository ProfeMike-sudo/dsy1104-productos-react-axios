import { api } from './api.js';

export async function listarProductos(signal) {
  const respuesta = await api.get('/productos', { signal: signal });
  // data es el cuerpo JSON; status y headers pertenecen a la respuesta HTTP.
  return respuesta.data;
}

export async function guardarProducto(dto) {
  const respuesta = await api.post('/productos', dto);
  return respuesta.data;
}

export function obtenerMensajeError(error) {
  if (error.response) {
    // Hubo respuesta HTTP: por ejemplo, 400 con errores del DTO de entrada.
    const datos = error.response.data;
    if (datos && typeof datos.mensaje === 'string') {
      const detalles = Array.isArray(datos.detalles) ? datos.detalles.join(' ') : '';
      return datos.mensaje + (detalles ? ' ' + detalles : '');
    }
    return 'La API respondió con un error (' + error.response.status + ').';
  }
  if (error.code === 'ECONNABORTED') return 'La API tardó demasiado. Revisa su estado antes de volver a guardar.';
  // El navegador no permite distinguir aquí entre CORS, red y servidor detenido.
  return 'No fue posible contactar la API. Revisa la conexión, su dirección y CORS.';
}
