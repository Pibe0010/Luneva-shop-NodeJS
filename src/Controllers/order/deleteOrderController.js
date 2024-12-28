import { deleteOrderService } from "../../Services/order/deleteOrderService.js";
import { handleErrorController } from "../../Utils/handleError.js";

export const deleteOrderController = async (req, res, next) => {
  try {
    // Obtengo el ID de la orden
    const order = req.params.ID_order;

    // Elimino la orden
    const response = await deleteOrderService(order);

    res.status(200).send({
      status: "ok",
      data: response,
    });
  } catch (error) {
    handleErrorController(
      error,
      next,
      "DELETE_ORDER_CONTROLLER_ERROR",
      "Error en el controlador al eliminar una orden"
    );
  }
};
