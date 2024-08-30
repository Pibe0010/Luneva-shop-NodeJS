import { selectCustomerListModel } from "../../Models/customer/selectCustomerListModel.js";
import { handleErrorService } from "../../Utils/handleError.js";

export const selectCustomerListService = async () => {
  try {
    const list = await selectCustomerListModel();

    return list;
  } catch (error) {
    handleErrorService(
      error,
      "GET_CUSTOMER_LIST_SERVICE_ERROR",
      "Error al obtener la lista de clientes desde el servicio"
    );
  }
};
