import { getCustomerSearchService } from "../../Services/customer/getCustomerSearchService.js";
import { handleErrorController } from "../../Utils/handleError.js";

export const getCustomerSearchController = async (req, res, next) => {
  try {
    // Obtengo el termino de busqueda
    const searchTerm = req.query.searchTerm;

    // Llamo al servicio
    const response = await getCustomerSearchService(searchTerm);

    res.status(200).send({ status: "ok", data: response });
  } catch (error) {
    handleErrorController(
      error,
      next,
      "GET_SEARCH_CUSTOMER_CONTROLLER_ERROR",
      "Error en el controlador al obtener la lista de clientes con la busqueda"
    );
  }
};
