import { selectOrderSearchModel } from "../../Models/order/selectOrderSearchModel.js";
import { handleErrorService } from "../../Utils/handleError.js";

export const getOrderSearchService = async (searchTerm) => {
  try {
    // Buscamos en la BD
    const order = await selectOrderSearchModel(searchTerm);

    return order;
  } catch (error) {
    handleErrorService(
      error,
      "GET_SEARCH_ORDER_SERVICE_ERROR",
      "Error al obtener la lista de busquedas de ordenes desde el servicio"
    );
  }
};
