import { selectShimpmentByIdModel } from "../../Models/shipments/selectShimpmentByIdModel.js";
import { updateShipmentModel } from "../../Models/shipments/updateShipmentModel.js";
import { handleErrorService } from "../../Utils/handleError.js";
import { notFoundError } from "../error/errorService.js";

export const updateShipmentService = async (ID_shipment, body) => {
  try {
    const { status } = body;
    // Verifico que el envio existe
    const shipment = await selectShimpmentByIdModel(ID_shipment);

    if (!shipment) {
      notFoundError("envio");
    }

    // Actualizo el envio
    await updateShipmentModel(ID_shipment, status);

    const response = await selectShimpmentByIdModel(ID_shipment);

    return response;
  } catch (error) {
    handleErrorService(
      error,
      "UPDATE_SHIPMENT_SERVICE_ERROR",
      "Error al actulizar el envio desde el servicio"
    );
  }
};
