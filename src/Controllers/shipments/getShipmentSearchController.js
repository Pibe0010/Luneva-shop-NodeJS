import { getShipmentSearchService } from "../../Services/shipments/getShipmentSearchService.js";
import { handleErrorController } from "../../Utils/handleError.js";

export const getShipmentSearchController = async (req, res, next) => {
  try {
    // Obtengo el termino de busqueda
    const searchTerm = req.query.searchTerm;
    console.log(searchTerm);

    const response = await getShipmentSearchService(searchTerm);

    res.status(200).send({ status: "ok", data: response });
  } catch (error) {
    handleErrorController(
      error,
      next,
      "GET_SEARCH_SHIPMENT_CONTROLLER_ERROR",
      "Error en el controlador al obtener la lista de envios con la busqueda"
    );
  }
};
