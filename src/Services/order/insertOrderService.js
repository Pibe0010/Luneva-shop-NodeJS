import { selectCustomerByIdModel } from "../../Models/customer/selectCustomerByIdModel.js";
import { getMaxReference5Digits } from "../../Models/getMaxRef.js";
import { inserOrderModel } from "../../Models/order/inserOrderModel.js";
import { selectOrderByIdModel } from "../../Models/order/selectOrderByIdModel.js";
import { selectTrolleyByOrderModel } from "../../Models/order/selectTrolleyByOrderModel.js";
import { generateReference5DigitsFromRef } from "../../Utils/generateReferenceDigits.js";
import { handleErrorService } from "../../Utils/handleError.js";
import { limitedStockError } from "../error/errorService.js";
import { controlStockProductService } from "../product/controlStockProductService.js";

export const insertOrderService = async (ID_user) => {
  try {
    // Obtengo el cliente con el ID
    const customer = await selectCustomerByIdModel(ID_user);

    // Obtengo el carrito del cliente
    const products = await selectTrolleyByOrderModel(customer.ID_customer);

    // Lista para almacenar las órdenes creadas
    const orders = [];

    // Creo la orden por cada producto en el carrito
    for (const product of products) {
      const productId = product.ID_product;

      // Compruebo el monto y si hay stock suficiente
      const checkQuantity = await controlStockProductService(productId);
      const stock = JSON.parse(JSON.stringify(checkQuantity));

      if (stock < product.products_amount) {
        limitedStockError(product.products_amount);
      }

      // Coloco un id a la orden
      const orderId = crypto.randomUUID();

      // Creamos la referencia de la orden
      const maxRef = await getMaxReference5Digits("Orders", "ref_OR");

      // Genero la referencia
      const ref = generateReference5DigitsFromRef("OR", maxRef);

      // Multiplicamos la cantidad por el precio del producto
      const price = checkQuantity.price * product.products_amount;

      // Inserto la orden en la BD
      await inserOrderModel(
        orderId,
        ref,
        customer.ID_customer,
        productId,
        product.products_amount,
        price
      );

      // Obtengo la orden insertada
      const order = await selectOrderByIdModel(orderId);

      // Agrego la orden a la lista de órdenes
      orders.push(order);
    }

    // Devolver todas las órdenes después de que se procesen todos los productos
    return orders;
  } catch (error) {
    handleErrorService(
      error,
      "NEW_ORDER_SERVICE_ERROR",
      "Error al insertar la orden desde el servicio"
    );
  }
};
