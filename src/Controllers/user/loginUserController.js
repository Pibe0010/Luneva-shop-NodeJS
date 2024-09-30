import { loginUserSchema } from "../../Schemas/user/loginUserSchema.js";
import { loginUserService } from "../../Services/user/loginUserService.js";
import { handleErrorController } from "../../Utils/handleError.js";
import { validateSchemaUtil } from "../../Utils/validateSchemaUtil.js";

export const loginUserController = async (req, res, next) => {
  try {
    // Validamos el body
    await validateSchemaUtil(loginUserSchema, req.body);

    // Obtengo los datos de login
    const { token, user } = await loginUserService(req.body);

    res.status(200).send({
      status: "ok",
      message: "Sesion iniciada correctamente",
      data: token,
      user: user.user_name,
    });
  } catch (error) {
    handleErrorController(
      error,
      next,
      "LOGIN_USER_CONTROLLER_ERROR",
      "Error en el controlador al hacer login"
    );
  }
};
