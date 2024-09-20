import { getUserSearchService } from "../../Services/user/getUserSearchService.js";
import { handleErrorController } from "../../Utils/handleError.js";

export const getUserSearchController = async (req, res, next) => {
  try {
    // Obtengo los terminos de busqueda
    const searchTerm = req.query.searchTerm;

    // Llamo al servicio
    const response = await getUserSearchService(searchTerm);

    res.status(200).send({ status: "ok", data: response });
  } catch (error) {
    handleErrorController(
      error,
      next,
      "GET_USER_LIST_CONTROLLER_ERROR",
      "Error en el controlador al obtener la lista de usuarios con la busqueda"
    );
  }
};
