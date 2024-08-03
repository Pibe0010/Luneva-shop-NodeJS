import { selectCustomerByIdModel } from "../../Models/customer/selectCustomerByIdModel.js";
import { insertProductTrolleyModel } from "../../Models/trolleys/insertProductTrolleyModel.js";
import { insertOrderService } from "../order/insertOrderService.js";
import { insertShipmenService } from "../shipments/insertShipmentService.js";

export const insertProductTrolleyService = async (
  ID_user,
  ID_product,
  products_amount
) => {
  // creao el id del carrito
  const ID_trolley = crypto.randomUUID();

  // Buscamos el cliente con el ID
  const customer = await selectCustomerByIdModel(ID_user);

  // Creamos la orden de el producto
  await insertOrderService(customer.ID_customer, ID_product, products_amount);

  // Cremos el envio
  await insertShipmenService(customer.ID_customer, ID_product);

  // insertamos el producto en el carrito de la BD
  const response = await insertProductTrolleyModel(
    ID_trolley,
    customer.ID_customer,
    ID_product,
    products_amount
  );

  return response;
};
