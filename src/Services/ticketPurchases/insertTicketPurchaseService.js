import { insertTicketPurchaseModel } from "../../Models/ticketPurchases/insertTicketPurchaseModel.js";
import { selectTicketByIdModel } from "../../Models/ticketPurchases/selectTicketByIdModel.js";
import { handleErrorService } from "../../Utils/handleError.js";
import { selectPaymentByOrdersModel } from "../../Models/payments/selectPaymentbyOrder.js";
import { updateStatusFromPaymentModel } from "../../Models/payments/updateStatusFromPaymentModel.js";

export const insertTicketPurchaseService = async (ID_order) => {
  try {
    // Obtengo el pago
    const payment = await selectPaymentByOrdersModel(ID_order);

    // ALmaceno los tickets
    const tickets = [];

    // Creo los tickets por cada pago
    for (const payments of payment) {
      // Creao el id del ticket
      const ID_ticket = crypto.randomUUID();

      // Inserto el ticket
      await insertTicketPurchaseModel(ID_ticket, payments.ID_payment);

      //Cambio el estado del pago a pagado
      await updateStatusFromPaymentModel(payments.ID_payment, "pending");

      // Retorno el ticket Creado
      const tickect = await selectTicketByIdModel(ID_ticket);

      tickets.push(tickect);
    }

    return tickets;
  } catch (error) {
    handleErrorService(
      error,
      "NEW_TICKET_PURCHASE_SERVICE_ERROR",
      "Error en el servicio al insertar el ticket de compra en la base de datos"
    );
  }
};
