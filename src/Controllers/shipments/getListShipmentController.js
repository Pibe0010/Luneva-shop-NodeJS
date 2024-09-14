import { getShipmentListService } from "../../Services/shipments/getShipmentListService.js";
import { handleErrorController } from "../../Utils/handleError.js";

export const getListShipmentController = async (req, res, next) => {
  try {
    // Obtengo la lista de envios
    const shipmentList = await getShipmentListService();

    res.status(200).send({
      status: "ok",
      data: shipmentList,
    });
  } catch (error) {
    handleErrorController(
      error,
      next,
      "GET_SHIPMENT_LIST_CONTROLLER_ERROR",
      "Error en el controlador al obtener la lista de envios"
    );
  }
};
