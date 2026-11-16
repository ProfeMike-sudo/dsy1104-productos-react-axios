import { useEffect, useState } from 'react'
import axios from 'axios'
import { listarProductos, guardarProducto, obtenerMensajeError } from '../services/productoService'
import { Boton } from '../components/atoms/Boton/Boton'
import { MensajeEstado } from '../components/molecules/MensajeEstado/MensajeEstado'
import { FormularioProducto } from '../components/organisms/FormularioProducto/FormularioProducto'
import { ListaProductos } from '../components/organisms/ListaProductos/ListaProductos'
import { ProductosTemplate } from '../components/templates/ProductosTemplate/ProductosTemplate'

// Página: es la única que conoce el service y por lo tanto a Axios.
// Guarda en su estado lo que responde la API y lo reparte por props hacia abajo.
export default function ProductosPage() {
  const [productos, setProductos] = useState([])
  const [cargando, setCargando] = useState(true)
  const [guardando, setGuardando] = useState(false)
  const [errorLista, setErrorLista] = useState('')
  const [errorGuardado, setErrorGuardado] = useState('')
  const [exito, setExito] = useState('')
  // revision cambia cuando se pide actualizar la lista y vuelve a ejecutar el efecto.
  const [revision, setRevision] = useState(0)

  // El efecto pide la lista cuando la página aparece y cada vez que revision cambia.
  useEffect(() => {
    const controlador = new AbortController()
    async function cargar() {
      setCargando(true)
      setErrorLista('')
      try {
        const datos = await listarProductos(controlador.signal)
        if (!controlador.signal.aborted) setProductos(datos)
      } catch (error) {
        if (!axios.isCancel(error)) setErrorLista(obtenerMensajeError(error))
      } finally {
        if (!controlador.signal.aborted) setCargando(false)
      }
    }
    cargar()
    // Cancela el GET si la página se desmonta o inicia otra carga.
    return () => controlador.abort()
  }, [revision])

  async function crearProducto(dto) {
    setGuardando(true)
    setErrorGuardado('')
    setExito('')
    try {
      const creado = await guardarProducto(dto)
      // Usamos el DTO de respuesta: su id lo asignó el backend.
      setProductos((anteriores) => anteriores.concat(creado))
      setExito('Producto guardado correctamente.')
      return true
    } catch (error) {
      setErrorGuardado(obtenerMensajeError(error))
      return false
    } finally {
      setGuardando(false)
    }
  }

  function recargar() {
    setCargando(true)
    setExito('')
    setRevision((actual) => actual + 1)
  }

  return (
    <ProductosTemplate
      mensajes={
        <>
          <MensajeEstado tipo="danger" texto={errorLista || errorGuardado} />
          <MensajeEstado tipo="success" texto={exito} />
        </>
      }
      formulario={
        <FormularioProducto
          onGuardar={crearProducto}
          guardando={guardando}
          deshabilitado={cargando || guardando || Boolean(errorLista)}
        />
      }
      acciones={
        <Boton onClick={recargar} disabled={cargando || guardando} variant="outline-primary">
          {errorLista ? 'Reintentar carga' : 'Actualizar lista'}
        </Boton>
      }
      lista={<ListaProductos productos={productos} cargando={cargando} error={errorLista} />}
    />
  )
}
