import { selectCustomerByIdModel } from "../../Models/customer/selectCustomerByIdModel.js";
import { deleteShippingAddressModel } from "../../Models/shippingAddresses/deleteShippingAddressModel.js";
import { handleErrorService } from "../../Utils/handleError.js";

export const deleteShippingAddressService = async (ID_user) => {
  try {
    // Obtemos la dirección
    const address = await selectCustomerByIdModel(ID_user);

    // Eliminamos la dirección
    await deleteShippingAddressModel(address.ID_customer);
  } catch (error) {
    handleErrorService(
      error,
      "DELETE_SHIPMENT_ADDRESS_SERVICE_ERROR",
      "Error al elimniar la dirección de envio del servicio"
    );
  }
};
