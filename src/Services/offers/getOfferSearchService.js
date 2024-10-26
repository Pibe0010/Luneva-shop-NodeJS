import { selectOfferSearchModel } from "../../Models/offers/selectOfferSearchModel.js";
import { handleErrorService } from "../../Utils/handleError.js";

export const getOfferSearchService = async (searchTerm) => {
  try {
    // Buscamos en la base de datos
    const offer = await selectOfferSearchModel(searchTerm);

    return offer;
  } catch (error) {
    handleErrorService(
      error,
      "GET_SEARCH_PRUDUCT_SERVICE_ERROR",
      "Error al obtener la lista de busquedas de ofertas desde el servicio"
    );
  }
};
