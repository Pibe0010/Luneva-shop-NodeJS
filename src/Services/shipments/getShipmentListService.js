import { getShipmentListModel } from "../../Models/shipments/getShipmentListModel.js";
import { handleErrorService } from "../../Utils/handleError.js";

export const getShipmentListService = async () => {
  try {
    const shipments = await getShipmentListModel();

    return shipments;
  } catch (error) {
    handleErrorService(
      error,
      "GET_SHIPMENT_LIST_SERVICE_ERROR",
      "Error al obtener la lista de envios desde el servicio"
    );
  }
};
