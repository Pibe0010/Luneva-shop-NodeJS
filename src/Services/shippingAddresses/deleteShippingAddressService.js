import { deleteShippingAddressModel } from "../../Models/shippingAddresses/deleteShippingAddressModel.js";
import { selectShippingAddressByIdModel } from "../../Models/shippingAddresses/selectShippingAddressByIdModel.js";
import { handleErrorService } from "../../Utils/handleError.js";
import { notFoundError } from "../error/errorService.js";

export const deleteShippingAddressService = async (ID_address) => {
  try {
    // Obtemos la dirección
    const address = await selectShippingAddressByIdModel(ID_address);

    // Verifico que existe la dirección
    if (!address) {
      notFoundError("dirección");
    }

    // Eliminamos la dirección
    await deleteShippingAddressModel(ID_address);
  } catch (error) {
    handleErrorService(
      error,
      "DELETE_SHIPMENT_ADDRESS_SERVICE_ERROR",
      "Error al elimniar la dirección de envio del servicio"
    );
  }
};
