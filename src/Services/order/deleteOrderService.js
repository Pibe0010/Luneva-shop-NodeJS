import { deleteOrderModel } from "../../Models/order/deleteOrderModel.js";
import { selectOrderByIdModel } from "../../Models/order/selectOrderByIdModel.js";
import { handleErrorService } from "../../Utils/handleError.js";
import { invalidStatusError } from "../error/errorService.js";

export const deleteOrderService = async (order) => {
  try {
    // Verificamos que la orden este cancellada
    const selectOrder = await selectOrderByIdModel(order);

    if (selectOrder.status !== "cancelled") {
      invalidStatusError(" La order no ha sido cancelado");
    }

    // Elimino la orden
    await deleteOrderModel(order);
  } catch (error) {
    handleErrorService(
      error,
      "DELETE_ORDER_SERVICE_ERROR",
      "Error al elimniar una orden del servicio"
    );
  }
};
