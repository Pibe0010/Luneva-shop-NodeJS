import { selectIdByRegistrationCodeModel } from "../../Models/user/selectIdByRegistrationCodeModel.js";
import { updatePasswordModel } from "../../Models/user/updatePasswordModel.js";
import { handleErrorService } from "../../Utils/handleError.js";
import { invalidCredentials } from "../error/errorService.js";
import bcrypt from "bcrypt";

export const updatePasswordService = async (registration_code, body) => {
  try {
    // Obtenemos el usuario y el código de registro
    const user = await selectIdByRegistrationCodeModel(registration_code);
    console.log(`Usuario encontrado: ${JSON.stringify(user)}`);

    // Verificar que el usuario exista
    if (!user) {
      invalidCredentials("El usuario no existe");
    }

    // Verificar que el código de registro coincida
    if (user.registration_code !== registration_code) {
      invalidCredentials("Código de registro inválido");
    }

    // Obtenemos las nuevas contraseñas
    const { newPassword, repeatPassword } = body;
    console.log(`Nuevas contraseñas: ${newPassword}, ${repeatPassword}`);

    // Verificar que las dos contraseñas sean iguales
    if (newPassword !== repeatPassword) {
      invalidCredentials("Las contraseñas no coinciden");
    }

    // Encriptar la nueva contraseña
    const hashedPassword = await bcrypt.hash(newPassword, 12);
    console.log(`Contraseña encriptada: ${hashedPassword}`);

    // Actualizar la contraseña en la base de datos
    const response = await updatePasswordModel(user.ID_user, hashedPassword);
    console.log(`Respuesta de actualización: ${JSON.stringify(response)}`);

    return response;
  } catch (error) {
    handleErrorService(
      error,
      "UPDATE_PASSWORD_SERVICE_ERROR",
      "Error en el servicio al modificar contraseña"
    );
  }
};
