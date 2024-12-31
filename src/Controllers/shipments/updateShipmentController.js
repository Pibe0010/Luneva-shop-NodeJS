import { updateShipmentSchema } from "../../Schemas/shipment/updateShipmentSchema.js";
import { updateShipmentService } from "../../Services/shipments/updateShipmentService.js";
import { handleErrorController } from "../../Utils/handleError.js";
import { validateSchemaUtil } from "../../Utils/validateSchemaUtil.js";

export const updateShipmentController = async (req, res, next) => {
  try {
    // Validamos el body
    await validateSchemaUtil(updateShipmentSchema, req.body);

    // Obtengo el envio
    const ID_shipment = req.params.ID_shipment;

    // Actualizamos el envio
    const response = await updateShipmentService(ID_shipment, req.body);

    res
      .status(200)
      .send({ status: "ok", data: "Envio actualizado", response: response });
  } catch (error) {
    handleErrorController(
      error,
      next,
      "UPDATE_SHIPMENT_CONTROLLER_ERROR",
      "Error en el controlador al modificar un envio"
    );
  }
};
