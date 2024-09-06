import { getShipmentService } from "../../Services/shipments/getShipmentService.js";
import { handleErrorController } from "../../Utils/handleError.js";

export const getShipmentController = async (req, res, next) => {
  try {
    // Obtengo el envio
    const ID_shipment = req.params.ID_shipment;

    // Buscamos el envio
    const response = await getShipmentService(ID_shipment);

    res.status(200).send({ status: "ok", response });
  } catch (error) {
    handleErrorController(
      error,
      next,
      "GET_SHIPMENT_CONTROLLER_ERROR",
      "Error en el controlador al obtener un envio"
    );
  }
};
