import { Form } from 'react-bootstrap'
import { Etiqueta } from '../../atoms/Etiqueta/Etiqueta'
import { Entrada } from '../../atoms/Entrada/Entrada'

// Molécula: una etiqueta y un campo. El controlId los une: al hacer clic en la
// etiqueta se enfoca el campo, y las pruebas pueden buscarlo por su texto.
export function CampoFormulario(props) {
  return (
    <Form.Group className="mb-3" controlId={props.id}>
      <Etiqueta>{props.etiqueta}</Etiqueta>
      <Entrada
        nombre={props.nombre}
        tipo={props.tipo}
        valor={props.valor}
        onChange={props.onChange}
        requerido={props.requerido}
        minimo={props.minimo}
        maximo={props.maximo}
        paso={props.paso}
        largoMinimo={props.largoMinimo}
        largoMaximo={props.largoMaximo}
        deshabilitado={props.deshabilitado}
      />
    </Form.Group>
  )
}
