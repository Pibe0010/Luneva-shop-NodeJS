import { selectCustomerByIdModel } from "../../Models/customer/selectCustomerByIdModel.js";
import { selectProductByIdModel } from "../../Models/product/selectProductByIdModel.js";
import { selectTrolleyByIdModel } from "../../Models/trolleys/selectTrolleyByIdModel.js";
import { updateProductStockModel } from "../../Models/trolleys/updateProductStockModel.js";
import { updateTrolleyModel } from "../../Models/trolleys/updateTrolleyModel.js";
import { notFoundError } from "../error/errorService.js";
import { updateOrderProductService } from "../order/updateOrderProductService.js";

export const updateTrolleyService = async (ID_user, body) => {
  const { ID_product, products_amount } = body;

  // Compruebo si el producto existe
  const existProduct = await selectProductByIdModel(ID_product);

  if (existProduct && existProduct.ID_product !== ID_product) {
    notFoundError("product");
  }

  // Buscamos el cliente con el ID
  const customer_id = await selectCustomerByIdModel(ID_user);

  // Buscamos el carrito del cliente
  const trolley = await selectTrolleyByIdModel(customer_id.ID_customer);

  // Actualizamos el stock del producto
  await updateProductStockModel(trolley.ID_trolley, ID_product);

  // Actualizamos el pricio del producto
  // Multiplicamos la cantidad por el precio del producto
  const price = existProduct.price * products_amount;

  // Actualizamos la cantidad de la orden
  updateOrderProductService(products_amount, ID_product, price);

  // Actualizamos el producto en el carrito
  await updateTrolleyModel(trolley.ID_trolley, ID_product, products_amount);

  // Devuelvo el carrot actualizado
  const trolleyUpdated = await selectTrolleyByIdModel(trolley.ID_trolley);

  return trolleyUpdated;
};
