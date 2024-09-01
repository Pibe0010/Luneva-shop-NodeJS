import { getProductSearchService } from "../../Services/product/getProductSearchService.js";
import { handleErrorService } from "../../Utils/handleError.js";

export const getProductSearchController = async (req, res, next) => {
  try {
    const searchTerm = req.query.searchTerm;
    console.log(searchTerm);

    const response = await getProductSearchService(searchTerm);

    res
      .status(200)
      .send({ status: "ok", message: "lista Productos", data: response });
  } catch (error) {
    handleErrorService(
      error,
      "GET_SEARCH_SERVICE_ERROR",
      "Error al obtener la lista de busquedas de productos desde el servicio"
    );
  }
};
