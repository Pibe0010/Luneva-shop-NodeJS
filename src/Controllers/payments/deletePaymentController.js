import { deletePaymentService } from "../../Services/payments/deletePaymentService.js";
import { handleErrorController } from "../../Utils/handleError.js";

export const deletePaymentController = async (req, res, next) => {
  try {
    // Obtengo el pago
    const ID_payment = req.params.ID_payment;

    // Elimino el pago
    await deletePaymentService(ID_payment);

    res.status(200).send({
      status: "ok",
      message: "Pago eliminado",
    });
  } catch (error) {
    handleErrorController(
      error,
      next,
      "DELETE_PAYMENT_CONTROLLER_ERROR",
      "Error en el controlador al eliminar una pago"
    );
  }
};
