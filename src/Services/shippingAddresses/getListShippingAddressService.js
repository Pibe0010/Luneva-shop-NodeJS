import { selectCustomerByIdModel } from "../../Models/customer/selectCustomerByIdModel.js";
import { getListShippingAddressModel } from "../../Models/shippingAddresses/getListShippingAddressModel.js";

export const getListShippingAddressService = async (ID_user) => {
  // Buscamos el cliente en la BD
  const customer = await selectCustomerByIdModel(ID_user);

  // Obtenemos la lista de direcciones de envios
  const addressList = await getListShippingAddressModel(customer.ID_customer);

  return addressList;
};
