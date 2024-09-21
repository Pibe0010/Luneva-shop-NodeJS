import { updateOrderStatusSchema } from "../../Schemas/orders/updateOrderStatusSchema.js";
import { updateOrderStatusService } from "../../Services/order/updateOrderStatusService.js";
import { handleErrorController } from "../../Utils/handleError.js";
import { validateSchemaUtil } from "../../Utils/validateSchemaUtil.js";

export const updateOrderStatusController = async (req, res, next) => {
  try {
    // Valido el body
    await validateSchemaUtil(updateOrderStatusSchema, req.body);

    // Obtengo la orden
    const ID_order = req.params.ID_order;

    // Actualizo el estado de la orden
    const response = await updateOrderStatusService(ID_order, req.body);

    res.status(200).send({
      status: "ok",
      message: "Orden actualizada",
      data: response,
    });
  } catch (error) {
    handleErrorController(
      error,
      next,
      "UPDATE_ORDER_STATUS_CONTROLLER_ERROR",
      "Error en el controlador al modificar el estado de una orden"
    );
  }
};
