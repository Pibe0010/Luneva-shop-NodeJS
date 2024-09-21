import { selectSearchShippingAddressModel } from "../../Models/shippingAddresses/selectSearchShippingAddressModel.js";
import { handleErrorService } from "../../Utils/handleError.js";

export const getSearchShippingAddressService = async (searchTerm) => {
  try {
    // Buscamos en la base de datos
    const shippingAddresses =
      await selectSearchShippingAddressModel(searchTerm);

    return shippingAddresses;
  } catch (error) {
    handleErrorService(
      error,
      "GET_SEARCH_ADDRESS_SERVICE_ERROR",
      "Error al obtener la lista de busquedas de direciònes desde el servicio"
    );
  }
};
