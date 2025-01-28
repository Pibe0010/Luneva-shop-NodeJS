import { selectCustomerByIdModel } from "../../Models/customer/selectCustomerByIdModel.js";
import { selectProductByIdModel } from "../../Models/product/selectProductByIdModel.js";
import { selectTrolleyByIdCustomerModel } from "../../Models/trolleys/selectTrolleyByIdCustomerModel.js";
import { selectTrolleyByIdModel } from "../../Models/trolleys/selectTrolleyByIdModel.js";
import { updateProductStockModel } from "../../Models/trolleys/updateProductStockModel.js";
import { updateTrolleyModel } from "../../Models/trolleys/updateTrolleyModel.js";
import { handleErrorService } from "../../Utils/handleError.js";
import { notFoundError } from "../error/errorService.js";
import { updateOrderService } from "../order/updateOrderService.js";

export const updateTrolleyService = async (ID_user, body) => {
  try {
    const { ID_product, products_amount } = body;

    // Compruebo si el producto existe
    const existProduct = await selectProductByIdModel(ID_product);

    if (existProduct && existProduct.ID_product !== ID_product) {
      notFoundError("product");
    }

    // Buscamos el cliente con el ID
    const customer_id = await selectCustomerByIdModel(ID_user);

    // Buscamos el carrito del cliente
    const trolley = await selectTrolleyByIdCustomerModel(
      customer_id.ID_customer,
      ID_product
    );

    // Actualizo la orden
    await updateOrderService(trolley.ID_order, ID_product, products_amount);

    // Actualizamos el stock del producto
    await updateProductStockModel(trolley.ID_trolley, ID_product);

    // Actualizamos el producto en el carrito
    await updateTrolleyModel(trolley.ID_trolley, ID_product, products_amount);

    // Devuelvo el carrot actualizado
    const trolleyUpdated = await selectTrolleyByIdModel(trolley.ID_trolley);

    return trolleyUpdated;
  } catch (error) {
    handleErrorService(
      error,
      "UPDATE_TROLLEY_SERVICE_ERROR",
      "Error al actulizar el carrito desde el servicio"
    );
  }
};
