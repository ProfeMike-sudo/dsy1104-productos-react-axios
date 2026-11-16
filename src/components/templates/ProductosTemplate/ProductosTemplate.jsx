import { Container, Row, Col } from 'react-bootstrap'

// Template: el esqueleto de la pantalla. No sabe qué contenido va adentro: lo recibe
// por props (mensajes, formulario, acciones y lista) y solo decide dónde queda cada uno.
// En celular las dos secciones se apilan; desde lg quedan una al lado de la otra (4 y 8 de 12 columnas).
export function ProductosTemplate(props) {
  return (
    <>
      <header className="encabezado py-4 mb-4">
        <Container>
          <p className="curso mb-2">DSY1104 · React + Axios</p>
          <h1 className="h2 mb-2">Catálogo de productos</h1>
          <p className="mb-0">Guarda un producto y consulta el catálogo.</p>
        </Container>
      </header>
      <Container as="main" className="pb-5">
        <div aria-live="polite">{props.mensajes}</div>
        <Row className="g-4">
          <Col as="section" xs={12} lg={4} aria-labelledby="titulo-formulario">
            <div className="panel p-4">
              <h2 id="titulo-formulario" className="h4 mb-4">Nuevo producto</h2>
              {props.formulario}
            </div>
          </Col>
          <Col as="section" xs={12} lg={8} aria-labelledby="titulo-lista">
            <div className="panel p-4">
              <div className="d-flex flex-wrap gap-3 justify-content-between align-items-center mb-4">
                <h2 id="titulo-lista" className="h4 mb-0">Productos guardados</h2>
                {props.acciones}
              </div>
              {props.lista}
            </div>
          </Col>
        </Row>
      </Container>
      <Container as="footer" className="text-body-secondary pb-4">
        Demostración de clase · Productos de ejemplo
      </Container>
    </>
  )
}
