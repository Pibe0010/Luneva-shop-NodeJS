import { activateUserModel } from "../../Models/user/activateUserModel.js";
import { findByRegistrationCodeModel } from "../../Models/user/findByRegistrationCodeModel.js";

export const validateUserController = async (req, res, next) => {
  try {
    // Obtengo el rigistration code ( Luego pondremos la url de activación )
    const { registration_code } = req.params;

    const userId = await findByRegistrationCodeModel(registration_code);

    const { ID_user } = userId;

    // Activo el usuario
    await activateUserModel(ID_user);

    res
      .status(201)
      .send({ status: "ok", message: "Cuenta activada correctamente" });
  } catch (error) {
    console.error(error);
    next(error);
  }
};
