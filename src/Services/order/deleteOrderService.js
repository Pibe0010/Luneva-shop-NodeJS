import { deleteOrderModel } from "../../Models/order/deleteOrderModel.js";
import { selectOrderByIdModel } from "../../Models/order/selectOrderByIdModel.js";
import { handleErrorService } from "../../Utils/handleError.js";
import { invalidStatusError, notFoundError } from "../error/errorService.js";

export const deleteOrderService = async (order) => {
  try {
    // Verificamos que la orden este cancellada
    const selectOrder = await selectOrderByIdModel(order);

    // Comprobamos que existe la orden
    if (!selectOrder) {
      notFoundError("order");
    }

    // comprabamos que este cancelada
    if (selectOrder.status !== "cancelled") {
      invalidStatusError(" La order no ha sido cancelado");
    }

    // Elimino la orden
    const response = await deleteOrderModel(order);

    return response;
  } catch (error) {
    handleErrorService(
      error,
      "DELETE_ORDER_SERVICE_ERROR",
      "Error al elimniar una orden del servicio"
    );
  }
};
