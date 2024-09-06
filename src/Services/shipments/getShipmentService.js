import { selectShimpmentByIdModel } from "../../Models/shipments/selectShimpmentByIdModel.js";
import { handleErrorService } from "../../Utils/handleError.js";
import { invalidCredentials } from "../error/errorService.js";

export const getShipmentService = async (ID_shipment) => {
  try {
    // Buscamos el envio en la BD
    const shipment = await selectShimpmentByIdModel(ID_shipment);

    if (!shipment) {
      invalidCredentials("El envio no existe");
    }

    return shipment;
  } catch (error) {
    handleErrorService(
      error,
      "GET_SHIPMENTT_SERVICE_ERROR",
      "Error al obtener el envio desde el servicio"
    );
  }
};
