import { deletePaymentCancelService } from "../../Services/payments/deletePaymentCancelService.js";
import { handleErrorController } from "../../Utils/handleError.js";

export const deletePaymentCancelController = async (req, res, next) => {
  try {
    // Obtengo el cliente
    const user = req.user.ID_user;

    // Elimino el pago
    await deletePaymentCancelService(user);

    res.status(200).send({
      status: "ok",
      data: "Pago eliminado",
    });
  } catch (error) {
    handleErrorController(
      error,
      next,
      "DELETE_PAYMENT_CANCELCONTROLLER_ERROR",
      "Error en el controlador al cancelar una pago"
    );
  }
};
