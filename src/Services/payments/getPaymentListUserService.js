import { getPaymentsListUserModel } from "../../Models/payments/getPaymentsListUserModel.js";
import { handleErrorService } from "../../Utils/handleError.js";

export const getPaymentListUserService = async () => {
  try {
    const response = await getPaymentsListUserModel();

    return response;
  } catch (error) {
    handleErrorService(
      error,
      "GET_PAYMENT_LIST_USER_SERVICE_ERROR",
      "Error al obtener la lista de pagos de usuario desde el servicio"
    );
  }
};
