import { selectShipmentSearchModel } from "../../Models/shipments/selectShipmentSearchModel.js";
import { handleErrorService } from "../../Utils/handleError.js";

export const getShipmentSearchService = async (searchTerm) => {
  try {
    // Buscamos en la base de datos
    const shipment = await selectShipmentSearchModel(searchTerm);

    return shipment;
  } catch (error) {
    handleErrorService(
      error,
      "GET_SEARCH_SHIPMENT_SERVICE_ERROR",
      "Error al obtener la lista de busquedas de envios desde el servicio"
    );
  }
};
