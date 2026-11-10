export default function Etiqueta(props) {
  return <label htmlFor={props.para} className="form-label">{props.children}</label>;
}
