import { selectProductByIdModel } from "../../Models/product/selectProductByIdModel.js";
import { toggleActiveModel } from "../../Models/product/toggleActiveModel.js";
import { handleErrorService } from "../../Utils/handleError.js";
import { notFoundError } from "../error/errorService.js";

export const toggleActivationProductService = async (ID_product, active) => {
  try {
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
  } catch (error) {
    handleErrorService(
      error,
      "TGGLE_ACTIVE_PRODUCT_SERVICE_ERROR",
      "Error en el servicio al cambiar el estado de un producto"
    );
  }
};
