export default function TarjetaProducto(props) {
  const precio = new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP', maximumFractionDigits: 2 });
  return (
    <article className="card h-100 producto-card">
      <div className="card-body">
        <h3 className="h5 card-title">{props.producto.nombre}</h3>
        <p className="precio mb-2">{precio.format(props.producto.precio)}</p>
        <p className="text-body-secondary mb-0">Stock: {props.producto.stock} unidades</p>
      </div>
    </article>
  );
}
