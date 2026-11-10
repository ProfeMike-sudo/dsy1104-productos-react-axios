# Productos: React, Axios, Bootstrap y Atomic Design

Ejemplo de DSY1104 para guardar y listar productos desde una API Express. Los componentes reciben `props` y acceden mediante `props.algo`; no se desestructuran las props.

Backend: https://github.com/ProfeMike-sudo/dsy1104-productos-api-express

Guía HTML autocontenida: [Guía 19: Axios y DTO](docs/19_Axios_React_Express_y_DTO.html). Descárgala y ábrela en un navegador; GitHub muestra su código fuente.

## Requisitos y ejecución local

Node.js 24 LTS y npm. Con nvm ya instalado: `nvm install 24` y `nvm use 24`.

```bash
git clone https://github.com/ProfeMike-sudo/dsy1104-productos-react-axios.git
cd dsy1104-productos-react-axios
npm ci
cp .env.example .env
npm run dev
```

Abre `http://localhost:5173`. El backend debe estar ejecutándose en el puerto 3000 y permitir el origen `http://localhost:5173`.

## Ejecutar en Ubuntu EC2

Entra con Visual Studio Code. Clona este repositorio en una carpeta separada del backend y ejecuta `npm ci`. Antes de iniciar Vite, configura `.env`:

```dotenv
VITE_API_URL=http://IP_PUBLICA_BACKEND:3000/api
```

Reemplaza `IP_PUBLICA_BACKEND` por la IP de la instancia del backend. Aunque React y Express estén en la misma EC2, no uses `localhost`: Axios se ejecuta en el navegador de tu computador.

En el grupo de seguridad del frontend permite TCP 5173 desde la IP pública de salida de tu computador. En el backend permite TCP 3000 desde ese mismo origen y configura `CORS_ORIGINS=http://IP_PUBLICA_FRONTEND:5173`. Si comparten instancia, ambas IP de instancia serán iguales. No actives un proxy de Vite: esta práctica muestra llamadas directas entre orígenes y CORS.

```bash
npm run dev
```

Abre `http://IP_PUBLICA_FRONTEND:5173`. Mantén la terminal activa; usa otra para el backend. Reinicia Vite cuando cambies `.env`. Si la instancia cambia de IP, actualiza ambos proyectos. Vite exige el puerto 5173 y falla si está ocupado, para evitar que el origen cambie silenciosamente.

`VITE_` se expone al navegador: no coloques secretos en estas variables. `npm run dev` es el servidor de desarrollo para la clase, no un despliegue de producción. Si pruebas un build, la dirección de la API se incorpora al construirlo: actualiza `.env` y vuelve a ejecutar `npm run build`.

## Flujo de la aplicación

1. La página carga los productos mediante `listarProductos()` y guarda la respuesta en estado.
2. El formulario recibe texto de los inputs. El DTO lo convierte a `{ nombre, precio, stock }`, con números en precio y stock.
3. La página llama a `guardarProducto(dto)`. Axios envía POST a Express.
4. Express valida el DTO, guarda y devuelve el producto con su id.
5. La página agrega el producto devuelto a la lista. El formulario se limpia únicamente tras confirmarse el éxito.

El botón Actualizar lista vuelve a consultar la API. Al recargar el navegador, los productos siguen en el backend. Si falla la carga inicial, se muestra un error con un botón para reintentar. Si falla el guardado, se conservan los campos. No se reintenta automáticamente POST: después de un timeout consulta la lista antes de reenviar para evitar duplicados.

## Atomic Design

| Nivel | Componentes | Responsabilidad |
| --- | --- | --- |
| Átomos | Boton, Etiqueta, Entrada | Elementos básicos |
| Moléculas | CampoFormulario, MensajeEstado, TarjetaProducto | Composición de una unidad de interfaz |
| Organismos | FormularioProducto, ListaProductos | Bloques funcionales |
| Templates | ProductosTemplate | Distribución de la pantalla mediante Bootstrap |
| Pages | ProductosPage | Estado, carga, guardado y errores |

`src/services/` contiene la instancia Axios y las llamadas HTTP; `src/dto/` prepara el cuerpo de entrada. Esas responsabilidades no van en los átomos.

Los hooks usan arreglos como `const [nombre, setNombre] = useState('')`; esto es distinto de desestructurar props. En los componentes se usa `props.valor`, `props.alGuardar`, `props.producto.nombre` y `props.children`.

## Axios y DTO

- `api.get('/productos')`: lee la lista.
- `api.post('/productos', dto)`: envía el cuerpo como JSON.
- `respuesta.data`: cuerpo devuelto por la API.
- `error.response`: hubo una respuesta HTTP de error.
- Error sin respuesta: revisar API, red, puertos, CORS y dirección.
- `AbortController` cancela el GET cuando el componente se desmonta. En modo desarrollo, StrictMode puede iniciar y cancelar una primera solicitud como parte de sus comprobaciones.

Un DTO limita y normaliza los campos transferidos; no reemplaza la validación del backend. El frontend de esta práctica solo permite guardar y listar; PUT y DELETE se pueden probar en Postman con la API.

## Pruebas y build

```bash
npm test
npm run build
```

Las pruebas verifican conversión a DTO, guardado, conservación de campos ante errores, nombre inválido, lista vacía y mensajes de error. `npm run preview` permite revisar el build en el puerto 5173.

## Recorrido para la clase

1. Con la API encendida, abre la pantalla y las herramientas del navegador, pestaña Network.
2. Guarda un Cuaderno con precio 2500 y stock 8. Observa POST, cuerpo JSON, 201 y respuesta con id.
3. Presiona Actualizar lista y observa GET y 200.
4. Recarga el navegador para comprobar persistencia.
5. Desde Postman envía precio negativo: observa 400 y los detalles de validación.
6. Detén la API y actualiza la lista: revisa el mensaje de error. Iníciala y presiona Reintentar carga.
