import { selectCustomerByIdModel } from "../../Models/customer/selectCustomerByIdModel.js";
import { selectShippingAddressByIdModel } from "../../Models/shippingAddresses/selectShippingAddressByIdModel.js";
import { updateShippingAddressModel } from "../../Models/shippingAddresses/updateShippingAddressModel.js";

export const updateShippingAddressService = async (ID_user, body) => {
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
};
