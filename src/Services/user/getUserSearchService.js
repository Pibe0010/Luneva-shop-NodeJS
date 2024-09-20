import { selectUserSearchModel } from "../../Models/user/selectUserSearchModel.js";
import { handleErrorService } from "../../Utils/handleError.js";

export const getUserSearchService = async (searchTerm) => {
  try {
    // Buscamos en la BD
    const user = await selectUserSearchModel(searchTerm);

    return user;
  } catch (error) {
    handleErrorService(
      error,
      "GET_USER_SEARCH_SERVICE_ERROR",
      "Error al obtener la lista de busquedas de usuarios desde el servicio"
    );
  }
};
