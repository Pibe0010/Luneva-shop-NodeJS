import { getTicketPurchaseSearchService } from "../../Services/ticketPurchases/getTicketPurchaseSearchService.js";
import { handleErrorController } from "../../Utils/handleError.js";

export const getticketPurchaseSearchController = async (req, res, next) => {
  try {
    // Obtengo el termino de busqueda
    const searchTerm = req.query.searchTerm;

    const response = await getTicketPurchaseSearchService(searchTerm);

    res.status(200).send({ status: "ok", data: response });
  } catch (error) {
    handleErrorController(
      error,
      next,
      "GET_TICKET_PURCHASE_SEARCH_CONTROLLER_ERROR",
      "Error en el controlador al obtener la lista de tickets de compra con la busqueda"
    );
  }
};
