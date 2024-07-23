import { selectOrderSearchModel } from "../../Models/order/selectOrderSearchModel.js";

export const getOrderSearchService = async (searchTerm) => {
  // Buscamos en la BD
  const order = await selectOrderSearchModel(searchTerm);

  return order;
};
