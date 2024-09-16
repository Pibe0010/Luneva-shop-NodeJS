import { updateOrderService } from "../../Services/order/updateOrderService.js";
import { handleErrorController } from "../../Utils/handleError.js";

export const updateOrderController = async (req, res, next) => {
  try {
    // Obtengo el cliente
    const ID_user = req.user.ID_user;

    // Actualizamos la orden
    const response = await updateOrderService(ID_user);

    res.status(200).send({
      status: "ok",
      message: "Orden actualizada",
      data: response,
    });
  } catch (error) {
    handleErrorController(
      error,
      next,
      "UPDATE_ORDER_CONTROLLER_ERROR",
      "Error en el controlador al modificar una orden"
    );
  }
};
