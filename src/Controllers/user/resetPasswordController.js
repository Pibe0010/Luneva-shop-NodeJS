import { changeResetPasswordSchema } from "../../Schemas/user/changeResetPasswordSchema.js";
import { updatePasswordService } from "../../Services/user/updatePasswordService.js";
import { handleErrorController } from "../../Utils/handleError.js";
import { validateSchemaUtil } from "../../Utils/validateSchemaUtil.js";

export const resetPasswordController = async (req, res, next) => {
  try {
    // Validar el esquema del cuerpo de la solicitud
    await validateSchemaUtil(changeResetPasswordSchema, req.body);

    const registration_code = req.params.registration_code;

    // Actualizar la contraseña en la base de datos
    const response = await updatePasswordService(registration_code, req.body);

    // Responder al cliente
    res.send(200).send({
      status: "ok",
      message: response.message,
    });
  } catch (error) {
    handleErrorController(
      error,
      next,
      "PASSWORD_USER_CONTROLLER_ERROR",
      "Error en el controlador al resetear la contraseña"
    );
  }
};
