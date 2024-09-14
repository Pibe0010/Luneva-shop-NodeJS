import { newOrderSchema } from "../../Schemas/orders/newOrderSchema.js";
import { insertOrderService } from "../../Services/order/insertOrderService.js";
import { handleErrorController } from "../../Utils/handleError.js";
import { validateSchemaUtil } from "../../Utils/validateSchemaUtil.js";

export const newOrderController = async (req, res, next) => {
  try {
    // Validamos el body
    await validateSchemaUtil(newOrderSchema, req.body);

    // Obtengo el id del cliente
    const ID_user = req.user.ID_user;

    // Insertamos la orden
    const response = await insertOrderService(ID_user, req.body);

    res.status(201).send({
      status: "ok",
      message: "Orden creada con exito",
      data: response,
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
