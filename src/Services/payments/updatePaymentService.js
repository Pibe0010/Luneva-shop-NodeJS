import { selectPaymentByIdModel } from "../../Models/payments/selectPaymentByIdModel.js";
import { updatePaymentModel } from "../../Models/payments/updatePaymentModel.js";
import { handleErrorService } from "../../Utils/handleError.js";
import { notFoundError } from "../error/errorService.js";

export const updatePaymentService = async (ID_payment, body) => {
  try {
    const { payment_method } = body;

    // Obtengo el pago
    const payment = await selectPaymentByIdModel(ID_payment);

    // Verifico si existe el pago
    if (!payment) {
      notFoundError("pago");
    }

    // Actualizamos el pago
    await updatePaymentModel(ID_payment, payment_method);

    // Devuelvo el pago actualizado
    const response = await selectPaymentByIdModel(ID_payment);

    return response;
  } catch (error) {
    handleErrorService(
      error,
      "UPDATE_PAYMENT_SERVICE_ERROR",
      "Error en el servicio al actualizar el pago"
    );
  }
};
