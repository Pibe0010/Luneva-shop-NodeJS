import { selectUserByIdModel } from "../../Models/user/selectUserByIdModel.js";
import { updatePasswordModel } from "../../Models/user/updatePasswordModel.js";
import {
  invalidCredentials,
  invalidPasswordError,
} from "../error/errorService.js";
import bcrypt from "bcrypt";

export const changePasswordService = async (ID_user, body) => {
  const { currentPassword, newPassword } = body;

  // Obtengo el usuario
  const user = await selectUserByIdModel(ID_user);

  if (!user) {
    invalidCredentials("El usuario no existe");
  }

  // Verificamos si la contraseña es correcta
  const isValidPassword = await bcrypt.compare(currentPassword, user.password);

  if (!isValidPassword) {
    invalidPasswordError();
  }
  // Encryptamos la nueva password
  const hashedPassword = await bcrypt.hash(newPassword, 12);

  // Actualizamos la password
  const response = await updatePasswordModel(ID_user, hashedPassword);

  return response;
};
