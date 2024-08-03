import { selectCustomerByIdModel } from "../../Models/customer/selectCustomerByIdModel.js";
import { selectOrderByIdModel } from "../../Models/order/selectOrderByIdModel.js";
import { updateOrderStatusModel } from "../../Models/order/updateOrderStatusModel.js";
import { deleteShipmentModel } from "../../Models/shipments/deleteShipmentModel.js";
import { deleteTrolleyModel } from "../../Models/trolleys/deleteTrolleyModel.js";
import { selectTrolleyByIdModel } from "../../Models/trolleys/selectTrolleyByIdModel.js";
import { updateProductStockDeleteModel } from "../../Models/trolleys/updateProductStockDeleteModel.js";
import { notFoundError } from "../error/errorService.js";

export const deleteTrolleyService = async (ID_user) => {
  // Obtenemos el cliente
  const customer_id = await selectCustomerByIdModel(ID_user);

  // Obtengo el carrito
  const trolley = await selectTrolleyByIdModel(customer_id.ID_customer);

  // Actualizamos el stock del producto
  await updateProductStockDeleteModel(trolley.ID_trolley);

  if (!trolley) {
    notFoundError("trolley");
  }

  // Actualizamos el estado de la orden
  await updateOrderStatusModel(trolley.ID_product, "cancelled");

  // Eliminamos el envio
  const order = await selectOrderByIdModel(trolley.ID_product);
  console.log(order);

  await deleteShipmentModel(order.ID_order);

  // eliminamos el carrito
  const response = await deleteTrolleyModel(trolley.ID_trolley);

  return response;
};
