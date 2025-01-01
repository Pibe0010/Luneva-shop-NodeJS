import { selectPaymentByIdModel } from "../../Models/payments/selectPaymentByIdModel.js";
import { updateStatusFromPaymentModel } from "../../Models/payments/updateStatusFromPaymentModel.js";
import { handleErrorService } from "../../Utils/handleError.js";

export const updatePaymentStatusService = async (ID_payment, body) => {
  try {
    const { status } = body;

    // Obtengo lel pago
    const payment = await selectPaymentByIdModel(ID_payment);

    // Actualizo el estado de el pago
    await updateStatusFromPaymentModel(payment.ID_payment, status);

    // Devuelvo el pago actualizada
    const response = await selectPaymentByIdModel(payment.ID_payment);

    return response;
  } catch (error) {
    handleErrorService(
      error,
      "UPDATE_ORDER_SERVICE_ERROR",
      "Error al actualizar el estado de el pago desde el servicio"
    );
  }
};
