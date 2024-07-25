import { selectCustomerByIdModel } from "../../Models/customer/selectCustomerByIdModel.js";
import { deleteShippingAddressModel } from "../../Models/shippingAddresses/deleteShippingAddressModel.js";

export const deleteShippingAddressService = async (ID_user) => {
  // Obtemos la dirección
  const address = await selectCustomerByIdModel(ID_user);
  console.log(address);

  // Eliminamos la dirección
  await deleteShippingAddressModel(address.ID_customer);
};
