import { useEffect, useState } from 'react';
import axios from 'axios';
import { listarProductos, guardarProducto, obtenerMensajeError } from '../services/productoService.js';
import Boton from '../components/atoms/Boton.jsx';
import MensajeEstado from '../components/molecules/MensajeEstado.jsx';
import FormularioProducto from '../components/organisms/FormularioProducto.jsx';
import ListaProductos from '../components/organisms/ListaProductos.jsx';
import ProductosTemplate from '../components/templates/ProductosTemplate.jsx';

export default function ProductosPage() {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [guardando, setGuardando] = useState(false);
  const [errorLista, setErrorLista] = useState('');
  const [errorGuardado, setErrorGuardado] = useState('');
  const [exito, setExito] = useState('');
  const [revision, setRevision] = useState(0);

  useEffect(function () {
    const controlador = new AbortController();
    async function cargar() {
      setCargando(true);
      setErrorLista('');
      try {
        const datos = await listarProductos(controlador.signal);
        if (!controlador.signal.aborted) setProductos(datos);
      } catch (error) {
        if (!axios.isCancel(error)) setErrorLista(obtenerMensajeError(error));
      } finally {
        if (!controlador.signal.aborted) setCargando(false);
      }
    }
    cargar();
    // Cancela el GET si la página se desmonta o inicia otra carga.
    return function () { controlador.abort(); };
  }, [revision]);

  async function crearProducto(dto) {
    setGuardando(true);
    setErrorGuardado('');
    setExito('');
    try {
      const creado = await guardarProducto(dto);
      // Usamos el DTO de respuesta: su id lo asignó el backend.
      setProductos(function (anteriores) { return anteriores.concat(creado); });
      setExito('Producto guardado correctamente.');
      return true;
    } catch (error) {
      setErrorGuardado(obtenerMensajeError(error));
      return false;
    } finally {
      setGuardando(false);
    }
  }

  function recargar() {
    setCargando(true);
    setExito('');
    setRevision(function (actual) { return actual + 1; });
  }

  return (
    <ProductosTemplate
      mensajes={<><MensajeEstado tipo="danger" texto={errorLista || errorGuardado} /><MensajeEstado tipo="success" texto={exito} /></>}
      formulario={<FormularioProducto alGuardar={crearProducto} guardando={guardando}
        deshabilitado={cargando || guardando || Boolean(errorLista)} />}
      acciones={<Boton alHacerClick={recargar} deshabilitado={cargando || guardando} clase="btn-outline-primary">
        {errorLista ? 'Reintentar carga' : 'Actualizar lista'}
      </Boton>}
      lista={<ListaProductos productos={productos} cargando={cargando} error={errorLista} />}
    />
  );
}
