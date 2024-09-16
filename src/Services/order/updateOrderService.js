import { selectCustomerByIdModel } from "../../Models/customer/selectCustomerByIdModel.js";
import { selectOrderByIdModel } from "../../Models/order/selectOrderByIdModel.js";
import { selectOrderByProductModel } from "../../Models/order/selectOrderByProductModel.js";
import { selectTrolleyByOrderModel } from "../../Models/order/selectTrolleyByOrderModel.js";
import { updateOrderModel } from "../../Models/order/updateOrderModel.js";
import { selectProductByIdModel } from "../../Models/product/selectProductByIdModel.js";
import { handleErrorService } from "../../Utils/handleError.js";

export const updateOrderService = async (ID_user) => {
  try {
    // Obtengo el cliente
    const customer = await selectCustomerByIdModel(ID_user);

    // Obtengo el carrito del cliente
    const products = await selectTrolleyByOrderModel(customer.ID_customer);

    // Lista para almacenar las órdenes actualizadas
    const orders = [];

    // Actualizo la orden por cada producto en el carrito si hay algún cambio en la cantidad
    for (const productCart of products) {
      // Obtengo el producto
      const product = await selectProductByIdModel(productCart.ID_product);

      // Multiplicamos la cantidad por el precio del producto
      const price = product.price * productCart.products_amount;

      // Comparando con el valor almacenado en la base de datos
      const existingOrder = await selectOrderByProductModel(
        productCart.ID_product,
        customer.ID_customer
      );

      // Log para verificar si se encontró la orden
      console.log("Orden existente:", existingOrder);

      if (!existingOrder) {
        console.log(
          `No se encontró una orden asociada para el producto ${productCart.ID_product}`
        );
        continue; // Si no hay una orden asociada, pasar al siguiente producto
      }

      // Verificamos si las cantidades son diferentes antes de actualizar
      if (existingOrder.products_amount !== productCart.products_amount) {
        // Log para verificar si se está actualizando la cantidad
        console.log(`Actualizando la orden ${existingOrder.ID_order}`);

        // Actualizamos la orden si ha cambiado la cantidad
        await updateOrderModel(
          productCart.products_amount,
          existingOrder.ID_order,
          price
        );

        // Devuelvo la orden actualizada
        const updatedOrder = await selectOrderByIdModel(existingOrder.ID_order);

        // Log para verificar la orden actualizada
        console.log("Orden actualizada:", updatedOrder);

        // Agrego la orden a la lista de órdenes actualizadas
        orders.push(updatedOrder);
      } else {
        // Log para indicar que no hubo cambios en la cantidad
        console.log(
          `La cantidad del producto ${productCart.ID_product} no ha cambiado`
        );
      }
    }

    // Devuelve todas las órdenes actualizadas
    return orders;
  } catch (error) {
    handleErrorService(
      error,
      "UPDATE_ORDER_SERVICE_ERROR",
      "Error al actualizar la orden desde el servicio"
    );
  }
};
