import { insertShipmenService } from "../../Services/shipments/insertShipmentService.js";
import { handleErrorController } from "../../Utils/handleError.js";

export const newShipmentController = async (req, res, next) => {
  try {
    // Obtengo el usuario
    const customer = req.user.ID_user;

    // Insertamos el envio en la BD
    const newShipment = await insertShipmenService(customer);

    res.status(201).send({
      status: "ok",
      message: "Envio creado con exito",
      data: { newShipment },
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
