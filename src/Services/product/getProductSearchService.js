import { selectProductSearchModel } from "../../Models/product/selectProductSearchModel.js";
import { handleErrorService } from "../../Utils/handleError.js";

export const getProductSearchService = async (searchTerm) => {
  try {
    const products = await selectProductSearchModel(searchTerm);
    return products;
  } catch (error) {
    handleErrorService(
      error,
      "GET_SEARCH_SERVICE_ERROR",
      "Error al obtener la lista de busquedas de productos desde el servicio"
    );
  }
};
