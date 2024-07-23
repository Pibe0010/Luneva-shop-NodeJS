import { getOrderListModel } from "../../Models/order/getOrderListModel.js";

export const getOrderListService = async () => {
  const orderList = await getOrderListModel();

  return orderList;
};
