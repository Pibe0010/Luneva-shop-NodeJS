import { activateUserModel } from "../../Models/user/activateUserModel.js";
import { findByRegistrationCodeModel } from "../../Models/user/findByRegistrationCodeModel.js";
import { handleErrorService } from "../../Utils/handleError.js";

export const activateUserService = async (registration_code) => {
  try {
    const userId = await findByRegistrationCodeModel(registration_code);

    const { ID_user } = userId;

    // Activo el usuario
    await activateUserModel(ID_user);
  } catch (error) {
    handleErrorService(
      error,
      "VALIDATE_USER_SERVICE_ERROR",
      "Error en el servicio al validar un usuario"
    );
  }
};
