import { selectCustomerByIdModel } from "../../Models/customer/selectCustomerByIdModel.js";
import { deleteTrolleyModel } from "../../Models/trolleys/deleteTrolleyModel.js";
import { selectTrolleyByIdCustomerModel } from "../../Models/trolleys/selectTrolleyByIdCustomerModel.js";
import { updateOrderStatusFromTrolleyModel } from "../../Models/trolleys/updateOrderStatusFromTrolleyModel.js";
import { updateProductStockDeleteModel } from "../../Models/trolleys/updateProductStockDeleteModel.js";
import { handleErrorService } from "../../Utils/handleError.js";
import { notFoundError } from "../error/errorService.js";
import { deleteOrderService } from "../order/deleteOrderService.js";

export const deleteTrolleyService = async (ID_user, ID_product) => {
  try {
    // Obtenemos el cliente
    const customer_id = await selectCustomerByIdModel(ID_user);

    // Obtengo el carrito
    const trolley = await selectTrolleyByIdCustomerModel(
      customer_id.ID_customer,
      ID_product
    );

    if (!trolley) {
      notFoundError("trolley");
    }

    const status = "cancelled";

    // Cambio el estado de la orden del producto a cancelado
    await updateOrderStatusFromTrolleyModel(trolley.ID_order, status);

    // Actualizamos el stock del producto
    await updateProductStockDeleteModel(trolley.ID_trolley);

    // eliminamos el producto del carrito
    const response = await deleteTrolleyModel(trolley.ID_trolley);

    // Borramos la orden del producto
    await deleteOrderService(trolley.ID_order);

    return response;
  } catch (error) {
    handleErrorService(
      error,
      "DELETE_TROLLEY_SERVICE_ERROR",
      "Error al elimniar un producto del carrito en el servicio"
    );
  }
};
