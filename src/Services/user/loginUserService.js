import { selectUserByEmailModel } from "../../Models/user/selectUserByEmailModel.js";
import { generateAccessToken } from "../../Utils/generateAccessToken.js";
import { handleErrorService } from "../../Utils/handleError.js";
import {
  invalidCredentials,
  invalidPasswordError,
  userAlreadyActivatedError,
} from "../error/errorService.js";
import bcrypt from "bcrypt";

export const loginUserService = async (body) => {
  try {
    const { email, password } = body;
    // Buscamos el usuario en la base de datos
    const user = await selectUserByEmailModel(email);

    if (!user) {
      invalidCredentials("El usuario / email no existe");
    }

    // Comprobamos si el usuario esta activo
    if (user.active != 1) {
      userAlreadyActivatedError();
    }

    // Comprobamos si el password es correcto
    const isPasswordValid = await bcrypt.compare(password, user.password);

    // Verificamos la password
    if (!isPasswordValid) {
      invalidPasswordError();
    }

    // Generamos el token
    const token = generateAccessToken(user);

    return { token, user };
  } catch (error) {
    handleErrorService(
      error,
      "LOGIN_USER_SERVICE_ERROR",
      "Error en el servicio al realizar login del usuario"
    );
  }
};
