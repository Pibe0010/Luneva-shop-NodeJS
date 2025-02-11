import { newShipmentSchema } from "../../Schemas/shipment/newShipmentSchema.js";
import { insertShipmenService } from "../../Services/shipments/insertShipmentService.js";
import { handleErrorController } from "../../Utils/handleError.js";
import { validateSchemaUtil } from "../../Utils/validateSchemaUtil.js";

export const newShipmentController = async (req, res, next) => {
  try {
    // Obtengo el usuario
    const customer = req.user.ID_user;

    // Validamos el body
    await validateSchemaUtil(newShipmentSchema, req.body);

    // Insertamos el envio en la BD
    const newShipment = await insertShipmenService(customer, req.body);

    res.status(201).send({
      status: "ok",
      message: "Envio creado con exito",
      data: newShipment,
    });
  } catch (error) {
    handleErrorController(
      error,
      next,
      "NEW_SHIPMENT_CONTROLLER_ERROR",
      "Error en el controlador de registro de un envio"
    );
  }
};
