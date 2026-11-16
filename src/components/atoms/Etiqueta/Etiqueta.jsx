import { Form } from 'react-bootstrap'

// Átomo: la etiqueta de un campo. Dentro de un Form.Group con controlId,
// React Bootstrap la une sola con su campo (el atributo for).
export function Etiqueta(props) {
  return <Form.Label>{props.children}</Form.Label>
}
