import { selectOrderByIdModel } from "../../Models/order/selectOrderByIdModel.js";
import { updateOrderModel } from "../../Models/order/updateOrderModel.js";
import { selectProductByIdModel } from "../../Models/product/selectProductByIdModel.js";
import { handleErrorService } from "../../Utils/handleError.js";

export const updateOrderService = async (order, body) => {
  try {
    const { products_amount } = body;

    // Seleciono la orden
    const selectOrder = await selectOrderByIdModel(order);

    // Obtnego el producto
    const product = await selectProductByIdModel(selectOrder.ID_product);

    // Multiplicamos la cantidad por el precio del producto
    const price = product.price * products_amount;

    // Actualizo la orden
    await updateOrderModel(products_amount, order, price);

    // Devuelvo la orden actualizada
    const response = await selectOrderByIdModel(order);

    return response;
  } catch (error) {
    handleErrorService(
      error,
      "NEW_ORDER_SERVICE_ERROR",
      "Error al actulizar la orden desde el servicio"
    );
  }
};
