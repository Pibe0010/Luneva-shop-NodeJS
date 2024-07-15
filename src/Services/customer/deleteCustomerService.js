import { deleteCustomerModel } from "../../Models/customer/deleteCustomerModel.js";
import { selectCustomerByIdModel } from "../../Models/customer/selectCustomerByIdModel.js";

export const deleteCustomerService = async (ID_user) => {
  // Obtengo el cliente
  const customer = await selectCustomerByIdModel(ID_user);

  // Elimino el cliente
  const deleteCustomer = await deleteCustomerModel(customer.ID_user);

  return deleteCustomer;
};
