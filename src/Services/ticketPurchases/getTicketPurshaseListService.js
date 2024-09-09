import { getTicketPurshaseListModel } from "../../Models/ticketPurchases/getTicketPurshaseListModel.js";
import { handleErrorService } from "../../Utils/handleError.js";

export const getTicketPurshaseListService = async () => {
  try {
    // Obtengo la lista de tickets
    const ticketList = await getTicketPurshaseListModel();

    return ticketList;
  } catch (error) {
    handleErrorService(
      error,
      "GET_TICKET_PURCHASE_LIST_SERVICE_ERROR",
      "Error al obtener la lista de tickets de compra desde el servicio"
    );
  }
};
