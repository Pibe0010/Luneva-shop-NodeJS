import { getTicketPurshaseListService } from "../../Services/ticketPurchases/getTicketPurshaseListService.js";
import { handleErrorController } from "../../Utils/handleError.js";

export const getTicketPurshaseListController = async (req, res, next) => {
  try {
    // Obtengo la lista de tickets
    const ticketList = await getTicketPurshaseListService();

    res.status(200).send({
      status: "ok",
      message: "Lista de tickets",
      data: ticketList,
    });
  } catch (error) {
    handleErrorController(
      error,
      next,
      "GET_TICKET_PURCHASE_LIST_CONTROLLER_ERROR",
      "Error en el controlador al obtener la lista de tickets de compra"
    );
  }
};
