import { Row, Col } from 'react-bootstrap'
import { TarjetaProducto } from '../../molecules/TarjetaProducto/TarjetaProducto'

// Organismo: la lista de productos. Según lo que reciba por props, dibuja
// el estado de carga, el error, la lista vacía o las tarjetas.
export function ListaProductos(props) {
  if (props.cargando) return <p role="status">Cargando productos...</p>
  if (props.error) return <p>La lista no está disponible. Usa el botón para reintentar.</p>
  if (props.productos.length === 0) return <p className="text-body-secondary">Todavía no hay productos. Guarda el primero.</p>

  return (
    // xs={12} md={6}: una tarjeta por fila en celular y dos desde tablet.
    <Row className="g-3">
      {props.productos.map((producto) => (
        // key identifica cada tarjeta con el id que asignó el backend.
        <Col xs={12} md={6} key={producto.id}>
          <TarjetaProducto producto={producto} />
        </Col>
      ))}
    </Row>
  )
}
