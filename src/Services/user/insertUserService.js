import { insertUserModel } from "../../Models/user/insertUserModel.js";
import { selectUserByEmailModel } from "../../Models/user/selectUserByEmailModel.js";
import { emailAlreadyRegisteredError } from "../error/errorService.js";

export const insertUserService = async (
  ID_user,
  user_name,
  last_name,
  email,
  hashed_password,
  registration_code
) => {
  try {
    // Buscamos en la BD si el usuario ya existe
    const userExists = await selectUserByEmailModel(email);

    if (userExists) {
      emailAlreadyRegisteredError();
    }

    // Creo el id del cliente
    const customer = crypto.randomUUID();

    // Insertamos el usuario en la BD
    await insertUserModel(
      ID_user,
      user_name,
      last_name,
      email,
      hashed_password,
      registration_code,
      customer
    );
  } catch (error) {
    console.error("Error al insertar el usuario:", error);
    throw error;
  }
};
