import { selectCustomerByIdModel } from "../../Models/customer/selectCustomerByIdModel.js";
import { insertProductTrolleyModel } from "../../Models/trolleys/insertProductTrolleyModel.js";
import { selectTrolleyByIdModel } from "../../Models/trolleys/selectTrolleyByIdModel.js";
import { handleErrorService } from "../../Utils/handleError.js";
import { insertOrderService } from "../order/insertOrderService.js";

export const insertProductTrolleyService = async (ID_user, body) => {
  try {
    // Obtengo l producto
    const { ID_product, products_amount } = body;

    // Buscamos el cliente con el ID
    const customer = await selectCustomerByIdModel(ID_user);

    // creo el id del carrito
    const ID_trolley = crypto.randomUUID();

    const orderId = crypto.randomUUID(); // Genera un ID único para la orden

    // Creamos la orden del producto
    await insertOrderService(ID_user, orderId, ID_product, products_amount);

    // insertamos el producto en el carrito de la BD
    await insertProductTrolleyModel(
      ID_trolley,
      customer.ID_customer,
      ID_product,
      products_amount,
      orderId
    );

    // Devuelvo el carrito actualizado
    const response = await selectTrolleyByIdModel(ID_trolley);

    return response;
  } catch (error) {
    handleErrorService(
      error,
      "NEW_TROLLEY_SERVICE_ERROR",
      "Error al insertar el producto en el carrito desde el servicio"
    );
  }
};
