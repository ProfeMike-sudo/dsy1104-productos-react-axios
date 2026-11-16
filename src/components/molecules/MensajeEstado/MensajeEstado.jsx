import { Alert } from 'react-bootstrap'

// Molécula: un aviso dentro de la página (sin alert()). Si no hay texto, no dibuja nada.
// props.tipo es la variante de Bootstrap: 'danger' para errores y 'success' para éxitos.
export function MensajeEstado(props) {
  if (!props.texto) return null

  return (
    <Alert variant={props.tipo} role={props.tipo === 'danger' ? 'alert' : 'status'}>
      {props.texto}
    </Alert>
  )
}
