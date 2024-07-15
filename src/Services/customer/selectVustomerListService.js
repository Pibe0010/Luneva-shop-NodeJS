import { selectCustomerListModel } from "../../Models/customer/selectCustomerListModel.js";

export const selectVustomerListService = async () => {
  const list = await selectCustomerListModel();

  return list;
};
