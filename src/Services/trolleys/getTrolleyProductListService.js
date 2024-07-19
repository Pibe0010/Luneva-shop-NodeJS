import { selectCustomerByIdModel } from "../../Models/customer/selectCustomerByIdModel.js";
import { getTrolleyProductListModel } from "../../Models/trolleys/getTrolleyProductListModel.js";

export const getTrolleyProductListService = async (ID_user) => {
  // Obtenemos el cliente
  const customer_id = await selectCustomerByIdModel(ID_user);

  const trolleyList = await getTrolleyProductListModel(customer_id.ID_customer);

  return trolleyList;
};
