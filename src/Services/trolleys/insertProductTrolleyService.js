import { selectCustomerByIdModel } from "../../Models/customer/selectCustomerByIdModel.js";
import { insertProductTrolleyModel } from "../../Models/trolleys/insertProductTrolleyModel.js";

export const insertProductTrolleyService = async (
  ID_user,
  ID_product,
  products_amount
) => {
  // creao el id del carrito
  const ID_trolley = crypto.randomUUID();

  // Buscamos el cliente con el ID
  const customer = await selectCustomerByIdModel(ID_user);

  // insertamos el producto en el carrito de la BD
  const response = await insertProductTrolleyModel(
    ID_trolley,
    customer.ID_customer,
    ID_product,
    products_amount
  );

  return response;
};
