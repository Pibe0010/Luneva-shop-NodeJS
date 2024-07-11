import { selectUserByEmailModel } from "../../Models/user/selectUserByEmailModel.js";
import { selectUserByIdModel } from "../../Models/user/selectUserByIdModel.js";
import { updateUserModel } from "../../Models/user/updateUserModel.js";
import { emailAlreadyRegisteredError } from "../error/errorService.js";

export const updateUserService = async (ID_user, body) => {
  const { user_name, last_name, email, role } = body;

  // Comprobamos si el email existe
  const existEmail = await selectUserByEmailModel(email);

  if (existEmail && existEmail.ID_user === ID_user) {
    emailAlreadyRegisteredError();
  }

  // Actualizamos el usuario
  await updateUserModel(ID_user, user_name, last_name, email, role);

  // Devolvemos el usuario actualizado
  const user = await selectUserByIdModel(ID_user);

  return user;
};
