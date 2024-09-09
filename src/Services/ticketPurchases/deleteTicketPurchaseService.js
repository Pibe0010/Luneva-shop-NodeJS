import { deleteTicketPurchaseModel } from "../../Models/ticketPurchases/deleteTicketPurchaseModel.js";
import { selectTicketByIdModel } from "../../Models/ticketPurchases/selectTicketByIdModel.js";
import { handleErrorService } from "../../Utils/handleError.js";
import { notFoundError } from "../error/errorService.js";

export const deleteTicketPurchaseService = async (ID_ticket) => {
  try {
    // Obtengo el ticket de la BD
    const ticket = await selectTicketByIdModel(ID_ticket);

    if (!ticket) {
      notFoundError("Ticket");
    }

    // Borro el ticket de la BD
    await deleteTicketPurchaseModel(ID_ticket);
  } catch (error) {
    handleErrorService(
      error,
      "DELETE_TICKET_PURCHASE_SERVICE_ERROR",
      "Error en el servicio al borrar un ticket de compra"
    );
  }
};
