import Etiqueta from '../atoms/Etiqueta.jsx';
import Entrada from '../atoms/Entrada.jsx';

export default function CampoFormulario(props) {
  return (
    <div className="mb-3">
      <Etiqueta para={props.id}>{props.etiqueta}</Etiqueta>
      <Entrada id={props.id} nombre={props.nombre} tipo={props.tipo} valor={props.valor}
        alCambiar={props.alCambiar} requerido={props.requerido} minimo={props.minimo}
        maximo={props.maximo} paso={props.paso} largoMinimo={props.largoMinimo}
        largoMaximo={props.largoMaximo} deshabilitado={props.deshabilitado} />
    </div>
  );
}
