import { getSearchShippingAddressService } from "../../Services/shippingAddresses/getSearchShippingAddressService.js";
import { handleErrorController } from "../../Utils/handleError.js";

export const getSearchShippingAddressController = async (req, res, next) => {
  try {
    // Obtengo el termino de busqueda
    const searchTerm = req.query.searchTerm;

    // Llamo al servicio
    const response = await getSearchShippingAddressService(searchTerm);

    res.status(200).send({ status: "ok", data: response });
  } catch (error) {
    handleErrorController(
      error,
      next,
      "GET_SEARCH_ADDRESS_CONTROLLER_ERROR",
      "Error en el controlador al obtener la lista de direccònes con la busqueda"
    );
  }
};
