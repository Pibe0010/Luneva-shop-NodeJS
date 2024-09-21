import { selectOrderByIdModel } from "../../Models/order/selectOrderByIdModel.js";
import { updateStatusFromOrderModel } from "../../Models/order/updateStatusFromOrderModel.js";
import { handleErrorService } from "../../Utils/handleError.js";

export const updateOrderStatusService = async (ID_order, body) => {
  try {
    const { status } = body;

    // Obtengo la orden
    const order = await selectOrderByIdModel(ID_order);

    // Actualizo el estado de la orden
    await updateStatusFromOrderModel(order.ID_order, status);

    // Devuelvo la orden actualizada
    const response = await selectOrderByIdModel(order.ID_order);

    return response;
  } catch (error) {
    handleErrorService(
      error,
      "UPDATE_ORDER_SERVICE_ERROR",
      "Error al actualizar el estado de la orden desde el servicio"
    );
  }
};
