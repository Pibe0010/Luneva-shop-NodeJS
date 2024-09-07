import { selectUserByIdModel } from "../../Models/user/selectUserByIdModel.js";
import { handleErrorService } from "../../Utils/handleError.js";

export const selectProfileUserService = async (ID_user) => {
  try {
    // Obtenemos el usuario
    const user = await selectUserByIdModel(ID_user);

    return user;
  } catch (error) {
    handleErrorService(
      error,
      "GET_PROFILE_USER_SERVICE_ERROR",
      "Error en el servicio al insertar usuario"
    );
  }
};
