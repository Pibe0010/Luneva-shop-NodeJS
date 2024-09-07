import { deleteUserModel } from "../../Models/user/deleteUserModel.js";
import { selectUserByIdModel } from "../../Models/user/selectUserByIdModel.js";
import { handleErrorService } from "../../Utils/handleError.js";
import { notFoundError } from "../error/errorService.js";

export const deleteUserService = async (ID_user) => {
  try {
    // Verificamos si existe el usuario
    const userExist = await selectUserByIdModel(ID_user);

    if (ID_user !== userExist.ID_user) {
      notFoundError("usuario");
    }

    // Borramos el usuario
    await deleteUserModel(ID_user);
  } catch (error) {
    handleErrorService(
      error,
      "DELETE_USERS_SERVICE_ERROR",
      "Error al elimniar un usuario desde el servicio"
    );
  }
};
