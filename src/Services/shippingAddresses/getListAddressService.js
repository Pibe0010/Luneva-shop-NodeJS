import { getListAddressModel } from "../../Models/shippingAddresses/getListAddressModel.js";
import { handleErrorService } from "../../Utils/handleError.js";

export const getListAddressService = async () => {
  try {
    // Obtenemos la lista de direcciones de envios
    const addressList = await getListAddressModel();

    return addressList;
  } catch (error) {
    handleErrorService(
      error,
      "GET_ADDRESS_LIST_SERVICE_ERROR",
      "Error al obtener la lista de direcciónes de envios desde el servicio"
    );
  }
};
