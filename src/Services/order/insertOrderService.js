import { getMaxReference5Digits } from "../../Models/getMaxRef.js";
import { inserOrderModel } from "../../Models/order/inserOrderModel.js";

import { generateReference5DigitsFromRef } from "../../Utils/generateReferenceDigits.js";
import { limitedStockError } from "../error/errorService.js";
import { controlStockProductService } from "../product/controlStockProductService.js";

export const insertOrderService = async (
  customer,
  ID_product,
  products_amount
) => {
  const productId = ID_product;

  // Compruebo el monto y si hay stock suficiente
  const checkQuantity = await controlStockProductService(productId);
  const stock = JSON.parse(JSON.stringify(checkQuantity));

  if (stock < products_amount) {
    limitedStockError(products_amount);
  }

  // Coloco un id a la orden
  const orderId = crypto.randomUUID();

  // Creamos la referecia de la orden
  // Obtengo la referencia maxima de la orden
  const maxRef = await getMaxReference5Digits("Orders", "ref_OR");

  // Genero la referencia
  const ref = generateReference5DigitsFromRef("OR", maxRef);

  // Multiplicamos la cantidad por el precio del producto
  const price = checkQuantity.price * products_amount;

  // Inserto el producto en la BD
  await inserOrderModel(
    orderId,
    ref,
    customer,
    productId,
    products_amount,
    price
  );
};
