import { deleteTicketPurchaseService } from "../../Services/ticketPurchases/deleteTicketPurchaseService.js";
import { handleErrorController } from "../../Utils/handleError.js";

export const deleteTicketPurchaseController = async (req, res, next) => {
  try {
    // Obtengo el ticket
    const ID_ticket = req.params.ID_ticket;

    // Elimino el ticket
    await deleteTicketPurchaseService(ID_ticket);

    res.status(200).send({
      status: "ok",
      message: "Ticket de compra eliminado",
    });
  } catch (error) {
    handleErrorController(
      error,
      next,
      "DELETE_TICKET_PURCHASE_CONTROLLER_ERROR",
      "Error en el controlador al eliminar un ticket de compra"
    );
  }
};
