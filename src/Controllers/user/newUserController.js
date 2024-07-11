import bcrypt from "bcrypt";
import { validateSchemaUtil } from "../../Utils/validateSchemaUtil.js";
import { newUserSchema } from "../../Schemas/user/newUserSchema.js";
import { insertUserService } from "../../Services/user/insertUserService.js";
/* import { sendWelcomeEmail } from "../../Services/email/sendWelcomeEmail.js"; */

export const newUserController = async (req, res, next) => {
  try {
    const { user_name, last_name, email, password } = req.body;

    // Validamos el body
    await validateSchemaUtil(newUserSchema, req.body);

    // Creamos el usuario, y el codigo de registro de activación
    const ID_user = crypto.randomUUID();
    const registration_code = crypto.randomUUID();
    const hashed_password = await bcrypt.hash(password, 12);

    // Insertamos el usuario en la base de datos
    await insertUserService(
      ID_user,
      user_name,
      last_name,
      email,
      hashed_password,
      registration_code
    );

    // Enviamos el email de activación
    /* await sendWelcomeEmail(user_name, email, registration_code); */

    res.status(201).send({
      status: "ok",
      message: "Usuario creado correctamente",
      data: { registration_code },
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};
