import { Card } from 'react-bootstrap'

// Intl.NumberFormat da formato de pesos chilenos al precio.
const formatoPrecio = new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP', maximumFractionDigits: 2 })

// Molécula: la ficha de un producto. Lee props.producto.nombre, .precio y .stock.
export function TarjetaProducto(props) {
  return (
    <Card as="article" className="h-100 producto-card">
      <Card.Body>
        <Card.Title as="h3" className="h5">{props.producto.nombre}</Card.Title>
        <Card.Text className="precio mb-2">{formatoPrecio.format(props.producto.precio)}</Card.Text>
        <Card.Text className="text-body-secondary mb-0">Stock: {props.producto.stock} unidades</Card.Text>
      </Card.Body>
    </Card>
  )
}
