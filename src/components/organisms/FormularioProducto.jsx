import { useState } from 'react';
import Boton from '../atoms/Boton.jsx';
import CampoFormulario from '../molecules/CampoFormulario.jsx';
import MensajeEstado from '../molecules/MensajeEstado.jsx';
import { crearProductoRequestDto } from '../../dto/producto.dto.js';

export default function FormularioProducto(props) {
  const [nombre, setNombre] = useState('');
  const [precio, setPrecio] = useState('');
  const [stock, setStock] = useState('');
  const [errorLocal, setErrorLocal] = useState('');

  async function enviar(evento) {
    evento.preventDefault();
    if (props.deshabilitado) return;
    setErrorLocal('');
    if (nombre.trim().length < 2) {
      setErrorLocal('Escribe un nombre de al menos dos caracteres.');
      return;
    }
    const dto = crearProductoRequestDto({ nombre: nombre, precio: precio, stock: stock });
    // La página comunica si guardó. Solo limpiamos los campos cuando hubo éxito.
    const guardado = await props.alGuardar(dto);
    if (guardado) { setNombre(''); setPrecio(''); setStock(''); }
  }

  return (
    <form onSubmit={enviar} aria-label="Nuevo producto">
      <CampoFormulario id="nombre" nombre="nombre" etiqueta="Nombre" valor={nombre}
        alCambiar={function (evento) { setNombre(evento.target.value); }} requerido
        largoMinimo={2} largoMaximo={80} deshabilitado={props.deshabilitado} />
      <CampoFormulario id="precio" nombre="precio" etiqueta="Precio (CLP)" tipo="number" valor={precio}
        alCambiar={function (evento) { setPrecio(evento.target.value); }} requerido
        minimo={0} maximo={100000000} paso="any" deshabilitado={props.deshabilitado} />
      <CampoFormulario id="stock" nombre="stock" etiqueta="Stock" tipo="number" valor={stock}
        alCambiar={function (evento) { setStock(evento.target.value); }} requerido
        minimo={0} maximo={1000000} paso={1} deshabilitado={props.deshabilitado} />
      <MensajeEstado tipo="danger" texto={errorLocal} />
      <Boton tipo="submit" deshabilitado={props.deshabilitado} clase="btn-primary w-100">
        {props.guardando ? 'Guardando...' : 'Guardar producto'}
      </Boton>
    </form>
  );
}
