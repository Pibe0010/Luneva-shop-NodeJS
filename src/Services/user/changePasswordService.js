import { selectUserByIdModel } from "../../Models/user/selectUserByIdModel.js";
import { updatePasswordModel } from "../../Models/user/updatePasswordModel.js";
import { handleErrorService } from "../../Utils/handleError.js";
import { invalidCredentials, notFoundError } from "../error/errorService.js";
import bcrypt from "bcrypt";

export const changePasswordService = async (ID_user, body) => {
  try {
    const { currentPassword, newPassword } = body;

    // Obtengo el usuario
    const user = await selectUserByIdModel(ID_user);

    if (!user) {
      invalidCredentials("El usuario no existe");
    }

    // Verificamos si la contraseña es correcta
    const isValidPassword = await bcrypt.compare(
      currentPassword,
      user.password
    );

    if (!isValidPassword) {
      notFoundError("La contraseña no coincide");
    }
    // Encryptamos la nueva password
    const hashedPassword = await bcrypt.hash(newPassword, 12);

    // Actualizamos la password
    const response = await updatePasswordModel(ID_user, hashedPassword);

    return response;
  } catch (error) {
    handleErrorService(
      error,
      "CHANGE_PASSWORD_SERVICE_ERROR",
      "Error al cambiar la contraseña del usuario en el servicio"
    );
  }
};
