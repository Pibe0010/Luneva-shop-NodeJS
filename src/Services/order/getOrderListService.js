import { getOrderListModel } from "../../Models/order/getOrderListModel.js";
import { handleErrorService } from "../../Utils/handleError.js";

export const getOrderListService = async () => {
  try {
    const orderList = await getOrderListModel();

    return orderList;
  } catch (error) {
    handleErrorService(
      error,
      "GET_ORDER_LIST_SERVICE_ERROR",
      "Error al obtener la lista de ordenes desde el servicio"
    );
  }
};
