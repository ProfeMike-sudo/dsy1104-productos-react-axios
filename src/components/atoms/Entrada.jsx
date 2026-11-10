export default function Entrada(props) {
  return (
    <input id={props.id} name={props.nombre} type={props.tipo || 'text'} className="form-control"
      value={props.valor} onChange={props.alCambiar} required={props.requerido}
      min={props.minimo} max={props.maximo} step={props.paso} minLength={props.largoMinimo}
      maxLength={props.largoMaximo} disabled={props.deshabilitado} />
  );
}
