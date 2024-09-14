import { getPaymentSearchService } from "../../Services/payments/getPaymentSearchService.js";
import { handleErrorController } from "../../Utils/handleError.js";

export const getPaymentSearchController = async (req, res, next) => {
  try {
    // Obtengo el termino de busqueda
    const searchTerm = req.query.searchTerm;

    const response = await getPaymentSearchService(searchTerm);

    res.status(200).send({ status: "ok", data: response });
  } catch (error) {
    handleErrorController(
      error,
      next,
      "GET_PAYMENT_SEARCH_CONTROLLER_ERROR",
      "Error en el controlador al obtener la lista de pagos con la busqueda"
    );
  }
};
