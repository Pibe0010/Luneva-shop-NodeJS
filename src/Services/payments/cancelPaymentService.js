import { cancelPaymentModel } from "../../Models/payments/cancelPaymentModel.js";
import { selectPaymentByIdModel } from "../../Models/payments/selectPaymentByIdModel.js";
import { handleErrorService } from "../../Utils/handleError.js";
import { notFoundError } from "../error/errorService.js";

export const cancelPaymentService = async (ID_payment, body) => {
  try {
    const { status } = body;

    // Verifico que el pago existe
    const payment = await selectPaymentByIdModel(ID_payment);

    if (!payment) {
      notFoundError("pago");
    }

    // Cancelo el pago
    await cancelPaymentModel(ID_payment, status);

    // Devuelvo el pago actualizado
    const response = await selectPaymentByIdModel(ID_payment);

    return response;
  } catch (error) {
    handleErrorService(
      error,
      "CANCEL_PAYMENT_SERVICE_ERROR",
      "Error en el servicio al cambiar el estado en la base de datos"
    );
  }
};
