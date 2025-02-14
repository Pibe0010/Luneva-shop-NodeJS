import { selectCustomerByIdModel } from "../../Models/customer/selectCustomerByIdModel.js";
import { selectOrdersFromCustomerModel } from "../../Models/order/selectOrdersFromCustomerModel.js";
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

    // Obtengo la orden del producto
    const order = await selectOrdersFromCustomerModel(customer_id.ID_customer);

    if (order[0].status !== "cancelled") {
      const status = "cancelled";

      // Cambio el estado de la orden del producto a cancelado
      await updateOrderStatusFromTrolleyModel(order[0].ID_order, status);
    }

    // Actualizamos el stock del producto
    await updateProductStockDeleteModel(trolley.ID_trolley);

    // eliminamos el producto del carrito
    const response = await deleteTrolleyModel(trolley.ID_trolley);

    // Borramos la orden del producto
    await deleteOrderService(order[0].ID_order);

    return response;
  } catch (error) {
    handleErrorService(
      error,
      "DELETE_TROLLEY_SERVICE_ERROR",
      "Error al elimniar un producto del carrito en el servicio"
    );
  }
};
