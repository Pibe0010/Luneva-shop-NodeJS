import { selectCustomerByIdModel } from "../../Models/customer/selectCustomerByIdModel.js";
import { getTrolleyProductListModel } from "../../Models/trolleys/getTrolleyProductListModel.js";
import { handleErrorService } from "../../Utils/handleError.js";

export const getTrolleyProductListService = async (ID_user) => {
  try {
    // Obtenemos el cliente
    const customer_id = await selectCustomerByIdModel(ID_user);

    const trolleyList = await getTrolleyProductListModel(
      customer_id.ID_customer
    );

    return trolleyList;
  } catch (error) {
    handleErrorService(
      error,
      "GET_TROLLEY_PRODUCTR_LIST_SERVICE_ERROR",
      "Error al obtener la lista de productos del carrito desde el servicio"
    );
  }
};
