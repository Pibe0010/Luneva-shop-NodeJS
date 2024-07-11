import { selectCustomerByIdModel } from "../../Models/customer/selectCustomerByIdModel.js";
import { inserOrderModel } from "../../Models/product/inserOrderModel.js";
import { updateStockProductModel } from "../../Models/product/updateStockProductModel.js";
import { selectSaleProductByIdService } from "./selectSaleProductByIdService.js";

export const insertOrderProductService = async (
  orderId,
  ID_user,
  productId,
  amount
) => {
  // Actualizo el sctock en producto
  await updateStockProductModel(productId, amount);

  // Obtengo el client de BD
  const customer = await selectCustomerByIdModel(ID_user);

  // Inserto la orden
  await inserOrderModel(orderId, ID_user, customer, productId, amount);

  // Obtengo el producto actualizado
  const result = await selectSaleProductByIdService(productId);

  return result[0];
};
