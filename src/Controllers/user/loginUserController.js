import { selectUserByEmailModel } from "../../Models/user/selectUserByEmailModel.js";
import { loginUserSchema } from "../../Schemas/user/loginUserSchema.js";
import {
  invalidCredentials,
  invalidPasswordError,
  userAlreadyActivatedError,
} from "../../Services/error/errorService.js";
import { generateAccessToken } from "../../Utils/generateAccessToken.js";
import { validateSchemaUtil } from "../../Utils/validateSchemaUtil.js";
import bcrypt from "bcrypt";

export const loginUserController = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Validamos el body
    await validateSchemaUtil(loginUserSchema, req.body);

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

    res.send({
      status: "ok",
      message: "Sesion iniciada correctamente",
      data: token,
      user: user.user_name,
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};
