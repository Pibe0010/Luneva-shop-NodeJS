import { selectShippingAdrressModel } from "../../Models/shippingAddresses/selectShippingAdrressModel.js";
import { handleErrorService } from "../../Utils/handleError.js";

export const selectShippingAdrressService = async (body) => {
  try {
    const { address } = body;

    // Selecciono la direccion de envio
    const selectedAddress = await selectShippingAdrressModel(address);

    return selectedAddress;
  } catch (error) {
    handleErrorService(
      error,
      "GET_SHIPMENT_ADDRESS_SERVICE_ERROR",
      "Error al obtener la dirección desde el servicio"
    );
  }
};
