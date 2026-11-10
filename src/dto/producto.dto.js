// Los inputs HTML entregan texto. El contrato de la API exige números.
export function crearProductoRequestDto(formulario) {
  return {
    nombre: formulario.nombre.trim(),
    precio: Number(formulario.precio),
    stock: Number(formulario.stock)
  };
}
