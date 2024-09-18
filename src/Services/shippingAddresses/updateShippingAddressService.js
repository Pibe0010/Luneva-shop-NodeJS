import { selectShippingAddressByIdModel } from "../../Models/shippingAddresses/selectShippingAddressByIdModel.js";
import { updateShippingAddressModel } from "../../Models/shippingAddresses/updateShippingAddressModel.js";
import { handleErrorService } from "../../Utils/handleError.js";

export const updateShippingAddressService = async (ID_address, body) => {
  try {
    const {
      address,
      city,
      postal_code,
      country,
      floor,
      ladder_door,
      street_number,
    } = body;

    // Actualizamos la direccion en la BD
    await updateShippingAddressModel(
      ID_address,
      address,
      city,
      postal_code,
      country,
      floor,
      ladder_door,
      street_number
    );

    const addressUpdated = await selectShippingAddressByIdModel(ID_address);

    return addressUpdated;
  } catch (error) {
    handleErrorService(
      error,
      "UPDATE_SHIPMENT_ADDRESS_SERVICE_ERROR",
      "Error al actulizar la dirección desde el servicio"
    );
  }
};
