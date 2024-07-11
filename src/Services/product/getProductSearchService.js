import { selectProductSearchModel } from "../../Models/product/selectProductSearchModel.js";

export const getProductSearchService = async (searchTerm) => {
  const products = await selectProductSearchModel(searchTerm);
  return products;
};
