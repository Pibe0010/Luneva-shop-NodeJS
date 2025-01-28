import { insertOrderService } from "../../Services/order/insertOrderService.js";
import { handleErrorController } from "../../Utils/handleError.js";

export const newOrderController = async (req, res, next) => {
  try {
    // Obtengo el cliente
    const ID_user = req.user.ID_user;

    // Insertamos la orden
    await insertOrderService(ID_user);

    res.status(201).send({
      status: "ok",
      message: "Orden creada con exito",
    });
  } catch (error) {
    handleErrorController(
      error,
      next,
      "NEW_ORDER_CONTROLLER_ERROR",
      "Error en el controlador de registro de una orden"
    );
  }
};
