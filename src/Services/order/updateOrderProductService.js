import { updateOrderProductModel } from "../../Models/order/updateOrderProductModel.js";

export const updateOrderProductService = async (
  products_amount,
  ID_product,
  price
) => {
  await updateOrderProductModel(products_amount, ID_product, price);
};
