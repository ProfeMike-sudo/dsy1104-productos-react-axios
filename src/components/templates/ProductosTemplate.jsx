export default function ProductosTemplate(props) {
  return (
    <>
      <header className="encabezado py-4 mb-4">
        <div className="container"><p className="curso mb-2">DSY1104 · React + Axios</p>
          <h1 className="h2 mb-2">Catálogo de productos</h1>
          <p className="mb-0">Guarda un producto y consulta el catálogo.</p>
        </div>
      </header>
      <main className="container pb-5">
        <div aria-live="polite">{props.mensajes}</div>
        <div className="row g-4">
          <section className="col-12 col-lg-4" aria-labelledby="titulo-formulario">
            <div className="panel p-4"><h2 id="titulo-formulario" className="h4 mb-4">Nuevo producto</h2>{props.formulario}</div>
          </section>
          <section className="col-12 col-lg-8" aria-labelledby="titulo-lista">
            <div className="panel p-4"><div className="d-flex flex-wrap gap-3 justify-content-between align-items-center mb-4">
              <h2 id="titulo-lista" className="h4 mb-0">Productos guardados</h2>{props.acciones}
            </div>{props.lista}</div>
          </section>
        </div>
      </main>
      <footer className="container text-body-secondary pb-4">Demostración de clase · Productos de ejemplo</footer>
    </>
  );
}
