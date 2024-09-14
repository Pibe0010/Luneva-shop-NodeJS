import { updateOrderSchema } from "../../Schemas/orders/updateOrderSchema.js";
import { updateOrderService } from "../../Services/order/updateOrderService.js";
import { handleErrorController } from "../../Utils/handleError.js";
import { validateSchemaUtil } from "../../Utils/validateSchemaUtil.js";

export const updateOrderController = async (req, res, next) => {
  try {
    // Validamos el body
    await validateSchemaUtil(updateOrderSchema, req.body);

    // Obtengo el producto
    const order = req.params.ID_order;

    // Actualizamos la orden
    const response = await updateOrderService(order, req.body);

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
