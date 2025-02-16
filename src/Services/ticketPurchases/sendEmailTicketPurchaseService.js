import {
  MAIL_TRAP_AUTH_PASS,
  MAIL_TRAP_AUTH_USER,
  MAIL_TRAP_HOST,
  MAIL_TRAP_PORT,
} from "../../../env.js";
import { changeTicketStatusModel } from "../../Models/ticketPurchases/changeTicketStatusModel.js";
import { getTicketPurshaseListUserModel } from "../../Models/ticketPurchases/getTicketPurshaseListUserModel.js";
import { selectUserByIdModel } from "../../Models/user/selectUserByIdModel.js";
import { handleErrorService } from "../../Utils/handleError.js";
import { notFoundError } from "../error/errorService.js";
import nodemailer from "nodemailer";

export const sendEmailTicketPurchaseService = async (ID_user) => {
  try {
    // comprobamos que el usuario existe
    const userExist = await selectUserByIdModel(ID_user);
    console.log(userExist);

    if (!userExist) {
      notFoundError("usuario");
    }

    // Obtengo los tickets del usuario
    const ticket = await getTicketPurshaseListUserModel(userExist.ID_customer);
    console.log(ticket);

    // Creao el ticket del usuario
    const sendTicket = ticket.sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    )[0];

    // Calcular totales
    const subtotal = ticket.reduce(
      (acc, product) =>
        acc + parseFloat(product.product_price) * product.product_amount,
      0
    );
    const totalDiscount = ticket.reduce(
      (acc, product) =>
        acc +
        (product.offer_discount
          ? (parseFloat(product.product_price) - product.offer_discount) *
            product.product_amount
          : 0),
      0
    );
    const shipping = ticket.reduce(
      (acc, product) => acc + parseFloat(product.shipment_cost),
      0
    );
    const iva = subtotal * 0.21;
    const total = subtotal - totalDiscount + shipping + iva;

    const transporter = nodemailer.createTransport({
      host: MAIL_TRAP_HOST,
      port: MAIL_TRAP_PORT,
      secure: false,
      auth: {
        user: MAIL_TRAP_AUTH_USER,
        pass: MAIL_TRAP_AUTH_PASS,
      },
    });

    const mailOptions = {
      from: MAIL_TRAP_AUTH_USER, // email de quien envia el msj
      to: userExist.email, // El correo al que se enviará el mensaje
      subject: `Buenas ${userExist.user_name} ${userExist.last_name} te enviamos tu factura de compra`,
      html: `
              <h1>Ticket de compra</h1>
        <p>Fecha: ${new Date(sendTicket.createdAt).toLocaleString()}</p>
        <ul>
          ${ticket
            .map(
              (t) => `
                <li>
                  <p><strong>Producto:</strong> ${t.name}</p>
                  <p><strong>Precio:</strong> ${t.product_price}€</p>
                  <p><strong>Cantidad:</strong> ${t.product_amount} uds</p>
                </li>
              `
            )
            .join("")}
        </ul>
        <p><strong>Subtotal:</strong> ${subtotal.toFixed(2)}€</p>
        <p><strong>IVA (21%):</strong> ${iva.toFixed(2)}€</p>
        <p><strong>Costo de envío:</strong> ${shipping.toFixed(2)}€</p>
        <p><strong>Descuento total:</strong> ${totalDiscount.toFixed(2)}€</p>
        <h3><strong>Total a pagar:</strong> ${total.toFixed(2)}€</h3>
        <h2>¡Gracias por tu compra!</h2>
        <h3>LUNEVASHOP</h3>
            `,
    };

    console.log("Correo enviado: ");
    console.log("mailOptions:", mailOptions);
    // Enviar el correo electrónico
    await transporter.sendMail(mailOptions);

    // Cambio el estado del ticket a enviado
    await Promise.all(
      ticket.map((t) => changeTicketStatusModel(t.ID_ticket, "sent"))
    );
  } catch (error) {
    handleErrorService(
      error,
      "SEND_EMAIL_TICKET_PURCHASE_SERVICE_ERROR",
      "Error en el servicio al enviar el ticket al usuario"
    );
  }
};
