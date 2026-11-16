import { Button } from 'react-bootstrap'

// Átomo: un botón de React Bootstrap con los valores típicos ya resueltos.
// "??" completa la prop que no llegó: props.type ?? 'button' se lee "type, o 'button' si no llegó".
export function Boton(props) {
  const type = props.type ?? 'button'
  const variant = props.variant ?? 'primary'

  return (
    <Button type={type} variant={variant} className={props.className} disabled={props.disabled} onClick={props.onClick}>
      {props.children}
    </Button>
  )
}
