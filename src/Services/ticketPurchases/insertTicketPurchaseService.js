import { selectCustomerByIdModel } from "../../Models/customer/selectCustomerByIdModel.js";
import { insertTicketPurchaseModel } from "../../Models/ticketPurchases/insertTicketPurchaseModel.js";
import { selectOrdersFromCustomerModel } from "../../Models/order/selectOrdersFromCustomerModel.js";
import { selectTicketByIdModel } from "../../Models/ticketPurchases/selectTicketByIdModel.js";
import { handleErrorService } from "../../Utils/handleError.js";

export const insertTicketPurchaseService = async (ID_user) => {
  try {
    // Obtengo el cliente
    const customer = await selectCustomerByIdModel(ID_user);

    // Obtengo la orden
    const order = await selectOrdersFromCustomerModel(customer.ID_customer);

    // ALmaceno los tickets
    const tickets = [];

    // Creo los tickets por cada orden
    for (const orders of order) {
      // Creao el id del ticket
      const ID_ticket = crypto.randomUUID();

      // Inserto el ticket
      await insertTicketPurchaseModel(ID_ticket, orders.ID_order);

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
