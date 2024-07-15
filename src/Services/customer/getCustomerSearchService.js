import { selectCustomerSearchModel } from "../../Models/customer/selectCustomerSearchModel.js";

export const getCustomerSearchService = async (searchTerm) => {
  const customer = await selectCustomerSearchModel(searchTerm);

  return customer;
};
