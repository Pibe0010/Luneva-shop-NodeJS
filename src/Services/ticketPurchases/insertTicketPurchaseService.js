import { selectCustomerByIdModel } from "../../Models/customer/selectCustomerByIdModel.js";
import { insertTicketPurchaseModel } from "../../Models/ticketPurchases/insertTicketPurchaseModel.js";
import { selectOrdersFromCustomerModel } from "../../Models/ticketPurchases/selectOrdersFromCustomerModel.js";
import { selectTicketByIdModel } from "../../Models/ticketPurchases/selectTicketByIdModel.js";
import { handleErrorService } from "../../Utils/handleError.js";

export const insertTicketPurchaseService = async (ID_user) => {
  try {
    // Obtengo el cliente
    const customer = await selectCustomerByIdModel(ID_user);

    // Obtengo la orden
    const order = await selectOrdersFromCustomerModel(customer.ID_customer);

    // Creao el id del ticket
    const ID_ticket = crypto.randomUUID();

    // Inserto el ticket
    await insertTicketPurchaseModel(ID_ticket, order.ID_order);

    // Retorno el ticket Creado
    const tickect = await selectTicketByIdModel(ID_ticket);

    return tickect;
  } catch (error) {
    handleErrorService(
      error,
      "NEW_TICKET_PURCHASE_SERVICE_ERROR",
      "Error en el servicio al insertar el ticket de compra en la base de datos"
    );
  }
};
