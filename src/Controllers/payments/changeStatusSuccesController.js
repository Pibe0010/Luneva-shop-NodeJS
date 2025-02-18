import { changeStatusSuccessService } from "../../Services/payments/changeStatusSuccessService.js";
import { handleErrorController } from "../../Utils/handleError.js";

export const changeStatusSuccessController = async (req, res, next) => {
  try {
    // Obtengo el usuario
    const ID_user = req.user.ID_user;

    // Cambio el estado de el pago, orden y ticket
    const response = await changeStatusSuccessService(ID_user);

    res.status(200).send({
      status: "ok",
      message: "Estados Cambiados con exito.",
      data: response,
    });
  } catch (error) {
    handleErrorController(
      error,
      next,
      "SUCCESS_PAYMENT_STATUS_CONTROLLER_ERROR",
      "Error en el controlador al cambiar el estado de los pago"
    );
  }
};
