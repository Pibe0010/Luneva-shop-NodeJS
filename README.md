# Luneva Shop nodeJS

## Tienda de jabones artesanales Backend

1. Inizializamos el proyecto de node

   - npm init -y

2. Instalamos las dependencias que usaremos en el proyecto.

   - bcrypt, cors, dotenv, express, express-fileupload, joi, jsonwebtoken, mysql2, nodemailer, sharp, morgan, stripe

3. Creamos los archivos

   - .env,.env.example, .gitignore, .prettierrc, .eslintrc, README.md

4. Armamos la extructura del proyecto, carpetas, archivos

5. Creamos la base de datos

6. creamos las rutas que usaremos

   - Ruta de usuarios.
   - Ruta de productos.
   - Ruta de clientes.
   - Ruta de carrito de compras.
   - Ruta de ordenes.
   - Ruta de pagos.
   - Ruta de envios.
   - Ruta de direcciónes.
   - Ruta de tickets.
   - Ruta de ofertas.

7. Lanzamos el servidor

   - npm run dev

8. Utilizaremos Postman para probar las rutas.

- User

  - Registro de usuario.
  - Activación de usuario.
  - Login de usuario.
  - actualizar usuario.
  - borrar usuario.
  - Listar de usuarios.
  - Buscar usuario.
  - Cambiar password.
  - Restablecer password.
  - Recuperar password.

- Product

  - Crear producto.
  - Listar de Productos.
  - Borrar Producto.
  - Actualizar Producto.
  - Activar / Desactivar Producto.
  - Busqueda de productos.
  - Producto a la venta.

- Customer

  - Lista de clientes.
  - Busqueda de clientes.
  - Actualizar cliente.
  - Borrar cliente.

- Trolley

  - Crear carrito de compras.
  - Actualizar carrito de compras.
  - Borrar producto del carrito de compras.
  - Listar de carritos de compras.
  - Cambiar estado del carrito de compras.
  - Borrar carrito de compras.

- Offers

  - Crear oferta.
  - Actualizar oferta.
  - Listar de ofertas.
  - Borrar oferta.
  - Activar / Desactivar oferta.
  - Buscar producto para la oferta.

- Orders

  - Crear orden.
  - Actualizar orden.
  - Borrar orden.
  - Listar de ordenes.
  - Buscar orden
  - Cambiar estado de la orden.

- ShippingAddress

  - Crear nueva dirección de envío.
  - Listar direcciones de envío.
  - Borrar direcciones de envío.
  - Actualizar direcciones de envío.
  - Seleccionar direcciones de envío.
  - Buscar direcciones de envío.

- Shipments

  - Crear envio.
  - Actualizar envio.
  - Borrar envio.
  - Lista de envío.
  - Buscar un envío.
  - Buscar envios.

- Ticket_purchases

  - Crear ticket.
  - Borrar ticket.
  - Lista de ticket.
  - Buscar ticket.

- Payments

  - Crear pago.
  - Borrar pago.
  - Lista de pagos.
  - Buscar pago.
  - Cancelar pago
  - Actulizar estado del pago
