import { getOrderSearchService } from "../../Services/order/getOrderSearchService.js";
import { handleErrorController } from "../../Utils/handleError.js";

export const getOrderSearchController = async (req, res, next) => {
  try {
    // Obtengo el termino de busqueda
    const searchTerm = req.query.searchTerm;

    const response = await getOrderSearchService(searchTerm);

    res.status(200).send({ status: "ok", data: response });
  } catch (error) {
    handleErrorController(
      error,
      next,
      "GET_SEARCH_ORDER_CONTROLLER_ERROR",
      "Error en el controlador al obtener la lista de ordenes con la busqueda"
    );
  }
};
