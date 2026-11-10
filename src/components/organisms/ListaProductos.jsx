import TarjetaProducto from '../molecules/TarjetaProducto.jsx';

export default function ListaProductos(props) {
  if (props.cargando) return <p role="status">Cargando productos...</p>;
  if (props.error) return <p>La lista no está disponible. Usa el botón para reintentar.</p>;
  if (props.productos.length === 0) return <p className="text-body-secondary">Todavía no hay productos. Guarda el primero.</p>;
  return (
    <div className="row g-3">
      {props.productos.map(function (producto) {
        return <div className="col-12 col-md-6" key={producto.id}><TarjetaProducto producto={producto} /></div>;
      })}
    </div>
  );
}
