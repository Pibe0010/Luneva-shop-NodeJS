import { activateUserService } from "../../Services/user/activateUserService.js";
import { handleErrorController } from "../../Utils/handleError.js";

export const validateUserController = async (req, res, next) => {
  try {
    // Obtengo el rigistration code ( Luego pondremos la url de activación )
    const registration_code = decodeURIComponent(req.params.registration_code);

    await activateUserService(registration_code);

    res
      .status(200)
      .send({ status: "ok", message: "Cuenta activada correctamente" });
  } catch (error) {
    handleErrorController(
      error,
      next,
      "VALIDATE_USER_CONTROLLER_ERROR",
      "Error en el controlador al validar un usuario"
    );
  }
};
