import { selectPaymentSearchModel } from "../../Models/payments/selectPaymentSearchModel.js";
import { handleErrorService } from "../../Utils/handleError.js";

export const getPaymentSearchService = async (searchTerm) => {
  try {
    // Buscamos en la base de datos
    const response = await selectPaymentSearchModel(searchTerm);

    return response;
  } catch (error) {
    handleErrorService(
      error,
      "GET_PAYMENT_SEARCH_SERVICE_ERROR",
      "Error en el servicio al obtener la lista de busquedas de pagos"
    );
  }
};
