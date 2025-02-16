import { selectCustomerByIdModel } from "../../Models/customer/selectCustomerByIdModel.js";
import { getTicketPurshaseListUserModel } from "../../Models/ticketPurchases/getTicketPurshaseListUserModel.js";
import { handleErrorService } from "../../Utils/handleError.js";

export const getTicketPurshaseListUserService = async (ID_user) => {
  try {
    // Obtengo el cliente
    const customer = await selectCustomerByIdModel(ID_user);

    // Obtengo la lista de tickets
    const ticketList = await getTicketPurshaseListUserModel(
      customer.ID_customer
    );

    return ticketList;
  } catch (error) {
    handleErrorService(
      error,
      "GET_TICKET_PURCHASE_LIST_USER_SERVICE_ERROR",
      "Error al obtener la lista de tickets de compra de un usuario desde el servicio"
    );
  }
};
