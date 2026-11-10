export default function Boton(props) {
  return (
    <button type={props.tipo || 'button'} className={'btn ' + (props.clase || 'btn-primary')}
      disabled={props.deshabilitado} onClick={props.alHacerClick}>
      {props.children}
    </button>
  );
}
