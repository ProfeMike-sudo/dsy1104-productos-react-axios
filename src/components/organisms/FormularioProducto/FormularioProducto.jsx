import { useState } from 'react'
import { Form } from 'react-bootstrap'
import { Boton } from '../../atoms/Boton/Boton'
import { CampoFormulario } from '../../molecules/CampoFormulario/CampoFormulario'
import { MensajeEstado } from '../../molecules/MensajeEstado/MensajeEstado'
import { crearProductoRequestDto } from '../../../dto/producto.dto'

// Organismo: el formulario de nuevo producto. Es dueño del estado de los campos.
// props.onGuardar(dto) es la función que entrega la página: hace el POST y devuelve
// true si el backend guardó el producto.
export function FormularioProducto(props) {
  const [nombre, setNombre] = useState('')
  const [precio, setPrecio] = useState('')
  const [stock, setStock] = useState('')
  const [errorLocal, setErrorLocal] = useState('')

  async function enviar(evento) {
    // Cancela la recarga que el navegador hace por defecto al enviar un formulario.
    evento.preventDefault()
    if (props.deshabilitado) return
    setErrorLocal('')
    if (nombre.trim().length < 2) {
      setErrorLocal('Escribe un nombre de al menos dos caracteres.')
      return
    }
    // Los inputs entregan texto: el DTO lo convierte a los números que exige la API.
    const dto = crearProductoRequestDto({ nombre: nombre, precio: precio, stock: stock })
    // La página comunica si guardó. Solo limpiamos los campos cuando hubo éxito.
    const guardado = await props.onGuardar(dto)
    if (guardado) {
      setNombre('')
      setPrecio('')
      setStock('')
    }
  }

  return (
    <Form onSubmit={enviar} aria-label="Nuevo producto">
      <CampoFormulario id="nombre" nombre="nombre" etiqueta="Nombre" valor={nombre} onChange={setNombre}
        requerido largoMinimo={2} largoMaximo={80} deshabilitado={props.deshabilitado} />
      <CampoFormulario id="precio" nombre="precio" etiqueta="Precio (CLP)" tipo="number" valor={precio} onChange={setPrecio}
        requerido minimo={0} maximo={100000000} paso="any" deshabilitado={props.deshabilitado} />
      <CampoFormulario id="stock" nombre="stock" etiqueta="Stock" tipo="number" valor={stock} onChange={setStock}
        requerido minimo={0} maximo={1000000} paso={1} deshabilitado={props.deshabilitado} />
      <MensajeEstado tipo="danger" texto={errorLocal} />
      <Boton type="submit" className="w-100" disabled={props.deshabilitado}>
        {props.guardando ? 'Guardando...' : 'Guardar producto'}
      </Boton>
    </Form>
  )
}
