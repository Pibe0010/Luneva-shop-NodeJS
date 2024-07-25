import { newShipmentController } from "../../Controllers/shipments/newShipmentController.js";
import { selectCustomerByIdModel } from "../../Models/customer/selectCustomerByIdModel.js";
import { insertProductTrolleyModel } from "../../Models/trolleys/insertProductTrolleyModel.js";
import { insertOrderService } from "../order/insertOrderService.js";

export const insertProductTrolleyService = async (
  ID_user,
  ID_product,
  products_amount
) => {
  // creao el id del carrito
  const ID_trolley = crypto.randomUUID();

  // Buscamos el cliente con el ID
  const customer = await selectCustomerByIdModel(ID_user);

  // Cremos orden de envio
  await newShipmentController(customer.ID_customer, ID_product);

  // Creamos la orden de el producto
  await insertOrderService(customer.ID_customer, ID_product, products_amount);

  // insertamos el producto en el carrito de la BD
  const response = await insertProductTrolleyModel(
    ID_trolley,
    customer.ID_customer,
    ID_product,
    products_amount
  );

  return response;
};
