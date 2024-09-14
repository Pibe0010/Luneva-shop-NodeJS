import { deletePaymentModel } from "../../Models/payments/deletePaymentModel.js";
import { selectPaymentByIdModel } from "../../Models/payments/selectPaymentByIdModel.js";
import { handleErrorService } from "../../Utils/handleError.js";
import { invalidStatusError, notFoundError } from "../error/errorService.js";

export const deletePaymentService = async (ID_payment) => {
  try {
    // Obtengo el pago
    const payment = await selectPaymentByIdModel(ID_payment);

    // Verifico si existe el pago
    if (!payment) {
      notFoundError("pago");
    }

    // Verifico que el pago este cancelado
    if (payment.status !== "cancelled") {
      invalidStatusError();
    }

    // Elimino el pago
    await deletePaymentModel(ID_payment);
  } catch (error) {
    handleErrorService(
      error,
      "DELETE_PAYMENT_SERVICE_ERROR",
      "Error en el servicio al borrar un pago"
    );
  }
};
