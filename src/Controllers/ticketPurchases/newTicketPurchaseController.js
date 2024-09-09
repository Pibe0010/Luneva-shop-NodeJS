import { insertTicketPurchaseService } from "../../Services/ticketPurchases/insertTicketPurchaseService.js";
import { handleErrorController } from "../../Utils/handleError.js";

export const newTicketPurchaseController = async (req, res, next) => {
  try {
    // obtengo el usuario
    const ID_user = req.user.ID_user;

    // inserto el ticket
    const response = await insertTicketPurchaseService(ID_user);

    res.status(201).send({
      status: "ok",
      message: "Ticket de compra creado",
      data: { response },
    });
  } catch (error) {
    handleErrorController(
      error,
      next,
      "NEW_TICKET_PURCHASE_CONTROLLER_ERROR",
      "Error en el controlador al insertar el ticket de compra"
    );
  }
};
