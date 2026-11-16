import { Form } from 'react-bootstrap'

// Átomo: un campo de texto controlado. El valor le llega de afuera en props.valor y,
// cada vez que la persona escribe, avisa con props.onChange(texto).
export function Entrada(props) {
  return (
    <Form.Control
      name={props.nombre}
      type={props.tipo ?? 'text'}
      value={props.valor}
      // e.target.value es el texto completo que hay ahora en el campo.
      onChange={(e) => props.onChange(e.target.value)}
      required={props.requerido}
      min={props.minimo}
      max={props.maximo}
      step={props.paso}
      minLength={props.largoMinimo}
      maxLength={props.largoMaximo}
      disabled={props.deshabilitado}
    />
  )
}
