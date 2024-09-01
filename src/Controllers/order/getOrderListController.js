import { getOrderListService } from "../../Services/order/getOrderListService.js";
import { handleErrorController } from "../../Utils/handleError.js";

export const getOrderListController = async (req, res, next) => {
  try {
    const orderList = await getOrderListService();
    res.status(200).send({ status: "ok", data: orderList });
  } catch (error) {
    handleErrorController(
      error,
      next,
      "GET_CUSTOMER_LIST_CONTROLLER_ERROR",
      "Error en el controlador al obtener la lista de ordenes"
    );
  }
};
