import { selectCustomerByIdModel } from "../../Models/customer/selectCustomerByIdModel.js";
import { insertShippingAddressModel } from "../../Models/shippingAddresses/insertShippingAddressModel.js";
import { handleErrorService } from "../../Utils/handleError.js";
import { insertShipmenService } from "../shipments/insertShipmentService.js";

export const insertShippingAddressService = async (ID_user, body) => {
  try {
    const {
      address,
      street_number,
      floor,
      ladder_door,
      city,
      postal_code,
      country,
    } = body;

    // creamos el id de la direccion
    const ID_address = crypto.randomUUID();

    // Buscamos el cliente en la BD
    const customer = await selectCustomerByIdModel(ID_user);

    // Insertamos la direccion en la BD
    const shippingAddress = await insertShippingAddressModel(
      ID_address,
      customer.ID_customer,
      address,
      street_number,
      floor,
      ladder_door,
      city,
      postal_code,
      country
    );

    // Creamos el envio en la BD
    await insertShipmenService(ID_user);

    return shippingAddress;
  } catch (error) {
    handleErrorService(
      error,
      "NEW_SHIPMENT_SERVICE_ERROR",
      "Error al insertar la dirección de envio desde el servicio"
    );
  }
};
