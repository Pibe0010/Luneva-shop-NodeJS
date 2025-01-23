import { selectCustomerByIdModel } from "../../Models/customer/selectCustomerByIdModel.js";
import { insertProductTrolleyModel } from "../../Models/trolleys/insertProductTrolleyModel.js";
import { selectTrolleyByIdModel } from "../../Models/trolleys/selectTrolleyByIdModel.js";
import { handleErrorService } from "../../Utils/handleError.js";

export const insertProductTrolleyService = async (ID_user, body) => {
  try {
    // Obtengo l producto
    const { ID_product, products_amount } = body;

    // creo el id del carrito
    const ID_trolley = crypto.randomUUID();

    // Buscamos el cliente con el ID
    const customer = await selectCustomerByIdModel(ID_user);

    // insertamos el producto en el carrito de la BD
    const responseData = await insertProductTrolleyModel(
      ID_trolley,
      customer.ID_customer,
      ID_product,
      products_amount
    );

    // Devuelvo el carrito actualizado
    const response = await selectTrolleyByIdModel(responseData);

    return response;
  } catch (error) {
    handleErrorService(
      error,
      "NEW_TROLLEY_SERVICE_ERROR",
      "Error al insertar el producto en el carrito desde el servicio"
    );
  }
};
