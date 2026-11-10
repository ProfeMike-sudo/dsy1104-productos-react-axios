import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import FormularioProducto from '../components/organisms/FormularioProducto.jsx';
import ListaProductos from '../components/organisms/ListaProductos.jsx';
import { crearProductoRequestDto } from '../dto/producto.dto.js';
import { obtenerMensajeError } from '../services/productoService.js';

describe('DTO y formulario', function () {
  it('convierte textos numéricos y selecciona solo campos del contrato', function () {
    expect(crearProductoRequestDto({ nombre: '  Cuaderno  ', precio: '2500', stock: '4', id: 'ajeno' }))
      .toEqual({ nombre: 'Cuaderno', precio: 2500, stock: 4 });
  });
  it('envía el DTO y limpia los campos solo después del éxito', async function () {
    const guardar = vi.fn().mockResolvedValue(true);
    const user = userEvent.setup();
    render(<FormularioProducto alGuardar={guardar} />);
    await user.type(screen.getByLabelText('Nombre'), 'Cuaderno');
    await user.type(screen.getByLabelText('Precio (CLP)'), '2500');
    await user.type(screen.getByLabelText('Stock'), '4');
    await user.click(screen.getByRole('button', { name: 'Guardar producto' }));
    expect(guardar).toHaveBeenCalledWith({ nombre: 'Cuaderno', precio: 2500, stock: 4 });
    expect(screen.getByLabelText('Nombre')).toHaveValue('');
  });
  it('conserva los datos si la API no confirma el guardado', async function () {
    const user = userEvent.setup();
    render(<FormularioProducto alGuardar={vi.fn().mockResolvedValue(false)} />);
    await user.type(screen.getByLabelText('Nombre'), 'Cuaderno');
    await user.type(screen.getByLabelText('Precio (CLP)'), '2500');
    await user.type(screen.getByLabelText('Stock'), '4');
    await user.click(screen.getByRole('button', { name: 'Guardar producto' }));
    expect(screen.getByLabelText('Nombre')).toHaveValue('Cuaderno');
  });
  it('rechaza nombres compuestos solo por espacios', async function () {
    const guardar = vi.fn(); const user = userEvent.setup();
    render(<FormularioProducto alGuardar={guardar} />);
    await user.type(screen.getByLabelText('Nombre'), '   ');
    await user.type(screen.getByLabelText('Precio (CLP)'), '0');
    await user.type(screen.getByLabelText('Stock'), '0');
    await user.click(screen.getByRole('button', { name: 'Guardar producto' }));
    expect(guardar).not.toHaveBeenCalled();
    expect(screen.getByRole('alert')).toHaveTextContent('al menos dos caracteres');
  });
});

describe('lista y errores', function () {
  it('distingue una lista vacía de productos recibidos', function () {
    const vista = render(<ListaProductos productos={[]} />);
    expect(screen.getByText(/Todavía no hay productos/)).toBeInTheDocument();
    vista.rerender(<ListaProductos productos={[{ id: '1', nombre: 'Cuaderno', precio: 2500, stock: 4 }]} />);
    expect(screen.getByRole('heading', { name: 'Cuaderno' })).toBeInTheDocument();
    expect(screen.getByText('Stock: 4 unidades')).toBeInTheDocument();
  });
  it('distingue errores HTTP, timeout y red', function () {
    expect(obtenerMensajeError({ response: { status: 400, data: { mensaje: 'Inválido.', detalles: ['Revisa stock.'] } } }))
      .toBe('Inválido. Revisa stock.');
    expect(obtenerMensajeError({ code: 'ECONNABORTED' })).toMatch(/tardó demasiado/);
    expect(obtenerMensajeError({})).toMatch(/CORS/);
  });
});
