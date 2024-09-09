import { selectTicketPurchaseSearchModel } from "../../Models/ticketPurchases/selectTicketPurchaseSearchModel.js";
import { handleErrorService } from "../../Utils/handleError.js";

export const getTicketPurchaseSearchService = async (searchTerm) => {
  try {
    // Bsucamos en la BD los tickets
    const ticket = await selectTicketPurchaseSearchModel(searchTerm);

    return ticket;
  } catch (error) {
    handleErrorService(
      error,
      "GET_TICKET_PURCHASE_SEARCH_SERVICE_ERROR",
      "Error en el servicio al obtener la lista de busquedas de tickets de compra"
    );
  }
};
