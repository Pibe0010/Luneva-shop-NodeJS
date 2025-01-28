import { selectOrderByIdModel } from "../../Models/order/selectOrderByIdModel.js";
import { selectProductOfferByIdModel } from "../../Models/order/selectProductOfferByIdModel.js";
import { selectTrolleyByOrderModel } from "../../Models/order/selectTrolleyByOrderModel.js";
import { updateOrderModel } from "../../Models/order/updateOrderModel.js";
import { selectProductByIdModel } from "../../Models/product/selectProductByIdModel.js";
import { handleErrorService } from "../../Utils/handleError.js";

export const updateOrderService = async (
  ID_order,
  ID_product,
  products_amount
) => {
  try {
    // Obtengo la orden
    const order = await selectTrolleyByOrderModel(ID_order);

    // Obtengo el precio del producto
    const product = await selectProductByIdModel(ID_product);

    // Verificamos si el producto tiene descuento
    const offer = await selectProductOfferByIdModel(ID_product);
    if (offer && offer.active) {
      console.log("Entró en los descuentos", offer);

      const discountUnit = Number(offer.discount_rate); // Descuento por unidad
      const currentProductsAmount = Number(order[0].product_amount); // Cantidad actual de productos
      const productPrice = Number(product.price); // Precio unitario del producto
      const newProductsAmount = currentProductsAmount + Number(products_amount); // Nueva cantidad total

      // Calcula el descuento total basado en la cantidad total de productos
      const totalDiscount = newProductsAmount * discountUnit;

      // Calcula el nuevo precio total con el descuento aplicado
      const newTotalPrice = newProductsAmount * productPrice - totalDiscount;

      console.log("Descuento total:", totalDiscount);
      console.log("Nuevo precio total:", newTotalPrice);

      // Actualizamos la orden
      await updateOrderModel(
        newProductsAmount,
        ID_order,
        totalDiscount,
        newTotalPrice
      );
    } else {
      const currentProductsAmount = Number(order[0].product_amount); // Cantidad actual de productos
      const productPrice = Number(product.price); // Precio unitario del producto
      const newProductsAmount = currentProductsAmount + Number(products_amount); // Nueva cantidad total
      const newTotalPrice = newProductsAmount * productPrice; // Calcula el nuevo precio total

      console.log(`Actualizando la orden ${ID_order}`);

      // Actualizamos la orden si no hay descuento
      await updateOrderModel(newProductsAmount, ID_order, newTotalPrice);

      // Devuelvo la orden actualizada
      const updatedOrder = await selectOrderByIdModel(ID_order);

      console.log("Orden actualizada:", updatedOrder);
    }
  } catch (error) {
    handleErrorService(
      error,
      "UPDATE_ORDER_SERVICE_ERROR",
      "Error al actualizar la orden desde el servicio"
    );
  }
};
