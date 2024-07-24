import { selectCustomerByIdModel } from "../../Models/customer/selectCustomerByIdModel.js";
import { insertShippingAddressModel } from "../../Models/shippingAddresses/insertShippingAddressModel.js";

export const insertShippingAddressService = async (ID_user, body) => {
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

  return shippingAddress;
};
