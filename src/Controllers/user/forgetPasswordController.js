import { recoveryPasswordSchema } from "../../Schemas/user/recoveryPasswordSchema.js";
import { sendRecoveryPaswordEmail } from "../../Services/email/sendWelcomeEmail.js";
import { forgetPasswordService } from "../../Services/user/forgetPasswordService.js";
import { handleErrorController } from "../../Utils/handleError.js";
import { validateSchemaUtil } from "../../Utils/validateSchemaUtil.js";

export const forgetPasswordController = async (req, res, next) => {
  try {
    // Validar el cuerpo de la solicitud
    await validateSchemaUtil(recoveryPasswordSchema, req.body);

    const { email } = req.body;

    //! Comentado para evitar envío de correos electrónicos luego remplazar el de abajo
    const new_registration_code = await forgetPasswordService(email);

    //! Comentado para evitar envío de correos electrónicos
    // Enviar correo electrónico de cambio de contraseña
    await sendRecoveryPaswordEmail(email, new_registration_code);

    // Devolvemos el usuario actualizado.
    res.status(200).send({ status: "ok", message: "Correo enviado" });
  } catch (error) {
    handleErrorController(
      error,
      next,
      "PASSWORD_USER_CONTROLLER_ERROR",
      "Error en el controlador de la peticion de restaurar contraseña"
    );
  }
};
