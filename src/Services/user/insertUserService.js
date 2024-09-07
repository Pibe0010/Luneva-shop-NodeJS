import { insertUserModel } from "../../Models/user/insertUserModel.js";
import { selectUserByEmailModel } from "../../Models/user/selectUserByEmailModel.js";
import { handleErrorService } from "../../Utils/handleError.js";
/* import { sendWelcomeEmail } from "../email/sendWelcomeEmail.js"; */
import { emailAlreadyRegisteredError } from "../error/errorService.js";
import bcrypt from "bcrypt";

export const insertUserService = async (body) => {
  try {
    const { user_name, last_name, email, password } = body;

    // Creamos el usuario, y el codigo de registro de activación
    const ID_user = crypto.randomUUID();
    const registration_code = crypto.randomUUID();
    const hashed_password = await bcrypt.hash(password, 12);

    // Enviamos el email de activación
    /* await sendWelcomeEmail(user_name, email, registration_code); */

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

    return { registration_code };
  } catch (error) {
    handleErrorService(
      error,
      "INSERT_USER_SERVICE_ERROR",
      "Error en el servicio al insertar usuario"
    );
  }
};
