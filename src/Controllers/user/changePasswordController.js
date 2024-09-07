import { changePasswordSchema } from "../../Schemas/user/changePasswordSchema.js";
import { changePasswordService } from "../../Services/user/changePasswordService.js";
import { handleErrorController } from "../../Utils/handleError.js";
import { validateSchemaUtil } from "../../Utils/validateSchemaUtil.js";

export const changePasswordController = async (req, res, next) => {
  try {
    // Validamos el body
    await validateSchemaUtil(changePasswordSchema, req.body);

    // Cambiamos la password
    const response = await changePasswordService(req.user.ID_user, req.body);

    res.status(201).send({ status: "ok", message: response });
  } catch (error) {
    handleErrorController(
      error,
      next,
      "PASSWORD_USER_CONTROLLER_ERROR",
      "Error en el controlador de cambio de contraseña"
    );
  }
};
