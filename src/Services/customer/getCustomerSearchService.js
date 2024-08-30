import { selectCustomerSearchModel } from "../../Models/customer/selectCustomerSearchModel.js";
import { handleErrorService } from "../../Utils/handleError.js";

export const getCustomerSearchService = async (searchTerm) => {
  try {
    const customer = await selectCustomerSearchModel(searchTerm);

    return customer;
  } catch (error) {
    handleErrorService(
      error,
      "GET_SEARCH_SERVICE_ERROR",
      "Error al obtener la lista de busquedas de clientes desde el servicio"
    );
  }
};
