import { selectCustomerByIdModel } from "../../Models/customer/selectCustomerByIdModel.js";
import { selectShippingAddressByIdModel } from "../../Models/shippingAddresses/selectShippingAddressByIdModel.js";
import { updateShippingAddressModel } from "../../Models/shippingAddresses/updateShippingAddressModel.js";
import { handleErrorService } from "../../Utils/handleError.js";

export const updateShippingAddressService = async (ID_user, body) => {
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

    // Buscamos el cliente en la BD
    const customer = await selectCustomerByIdModel(ID_user);

    // Actualizamos la direccion en la BD
    await updateShippingAddressModel(
      customer.ID_customer,
      address,
      city,
      postal_code,
      country,
      floor,
      ladder_door,
      street_number
    );

    const addressUpdated = await selectShippingAddressByIdModel(
      customer.ID_customer
    );

    return addressUpdated;
  } catch (error) {
    handleErrorService(
      error,
      "UPDATE_SHIPMENT_ADDRESS_SERVICE_ERROR",
      "Error al actulizar la dirección desde el servicio"
    );
  }
};
