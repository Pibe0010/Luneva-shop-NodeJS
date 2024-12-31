import { deleteShipmentService } from "../../Services/shipments/deleteShipmentService.js";
import { handleErrorController } from "../../Utils/handleError.js";

export const deleteShipmentController = async (req, res, next) => {
  try {
    // Obtengo el envio
    const ID_shipment = req.params.ID_shipment;

    // Elimino el envio
    await deleteShipmentService(ID_shipment);

    res.status(200).send({ status: "ok", data: "Envio eliminado" });
  } catch (error) {
    handleErrorController(
      error,
      next,
      "DELETE_SHIPMENT_CONTROLLER_ERROR",
      "Error en el controlador al eliminar un envio"
    );
  }
};
