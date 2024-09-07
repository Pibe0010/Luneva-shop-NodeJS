import { getUserListModel } from "../../Models/user/getUserListModel.js";
import { handleErrorService } from "../../Utils/handleError.js";

export const getUserListService = async () => {
  try {
    const usersList = await getUserListModel();

    return usersList;
  } catch (error) {
    handleErrorService(
      error,
      "GET_USER_LIST_SERVICE_ERROR",
      "Error al obtener la lista de usuarios desde el servicio"
    );
  }
};
