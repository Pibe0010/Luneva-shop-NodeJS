import { getPaymentsListModel } from "../../Models/payments/getPaymentsListModel.js";
import { handleErrorService } from "../../Utils/handleError.js";

export const getPaymentListService = async () => {
  try {
    const response = await getPaymentsListModel();

    return response;
  } catch (error) {
    handleErrorService(
      error,
      "GET_PAYMENT_LIST_SERVICE_ERROR",
      "Error al obtener la lista de pagos desde el servicio"
    );
  }
};
