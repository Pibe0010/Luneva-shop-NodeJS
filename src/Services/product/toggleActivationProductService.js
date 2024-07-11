import { selectProductByIdModel } from "../../Models/product/selectProductByIdModel.js";
import { toggleActiveModel } from "../../Models/product/toggleActiveModel.js";
import { notFoundError } from "../error/errorService.js";

export const toggleActivationProductService = async (ID_product, active) => {
  // Compruebo si existe el producto
  const product = await selectProductByIdModel(ID_product);

  if (!product) {
    notFoundError("product");
  }

  // Actualizo el estado del producto
  await toggleActiveModel(ID_product, active);

  // Devuelvo el nuevo estado del producto
  const productUpdated = await selectProductByIdModel(ID_product);

  return productUpdated;
};
