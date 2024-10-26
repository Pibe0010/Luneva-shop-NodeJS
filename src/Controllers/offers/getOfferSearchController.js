import { getOfferSearchService } from "../../Services/offers/getOfferSearchService.js";
import { handleErrorController } from "../../Utils/handleError.js";

export const getOfferSearchController = async (req, res, next) => {
  try {
    // Obtengo el termino de busqueda
    const searchTerm = req.query.searchTerm;

    const response = await getOfferSearchService(searchTerm);

    res
      .status(200)
      .send({ status: "ok", message: "lista de ofertas", data: response });
  } catch (error) {
    handleErrorController(
      error,
      next,
      "GET_SEARCH_PRODUCT_CONTROLLER_ERROR",
      "Error en el controlador al obtener la lista de ofertas con la busqueda"
    );
  }
};
