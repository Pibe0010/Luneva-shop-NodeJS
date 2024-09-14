import { getProductSearchService } from "../../Services/product/getProductSearchService.js";
import { handleErrorController } from "../../Utils/handleError.js";

export const getProductSearchController = async (req, res, next) => {
  try {
    // Obtengo el termino de busqueda
    const searchTerm = req.query.searchTerm;

    const response = await getProductSearchService(searchTerm);

    res
      .status(200)
      .send({ status: "ok", message: "lista Productos", data: response });
  } catch (error) {
    handleErrorController(
      error,
      next,
      "GET_SEARCH_PRODUCT_CONTROLLER_ERROR",
      "Error en el controlador al obtener la lista de productos con la busqueda"
    );
  }
};
