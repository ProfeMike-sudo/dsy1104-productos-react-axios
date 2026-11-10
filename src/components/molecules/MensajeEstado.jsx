export default function MensajeEstado(props) {
  if (!props.texto) return null;
  return <div className={'alert alert-' + props.tipo} role={props.tipo === 'danger' ? 'alert' : 'status'}>{props.texto}</div>;
}
