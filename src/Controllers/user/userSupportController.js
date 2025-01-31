import { userSupportSchema } from "../../Schemas/user/userSupportSchema.js";
import { userSupportService } from "../../Services/user/userSupportService.js";
import { handleErrorController } from "../../Utils/handleError.js";
import { validateSchemaUtil } from "../../Utils/validateSchemaUtil.js";

export const userSupportController = async (req, res, next) => {
  try {
    // Validamos el body
    await validateSchemaUtil(userSupportSchema, req.body);

    // Obtengo el cliente
    const ID_user = req.user.ID_user;

    // Enviamos el email
    await userSupportService(ID_user, req.body);

    res.status(200).send({ status: "ok", message: "Correo enviado con éxito" });
  } catch (error) {
    handleErrorController(
      error,
      next,
      "NEW_EMAIL_CONTROLLER_ERROR",
      "Error en el controlador de soporte de usuario"
    );
  }
};
