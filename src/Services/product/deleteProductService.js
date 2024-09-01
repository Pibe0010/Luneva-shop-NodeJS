import { deleteProductModel } from "../../Models/product/deleteProductModel.js";
import { selectProductByIdModel } from "../../Models/product/selectProductByIdModel.js";
import { handleErrorService } from "../../Utils/handleError.js";
import { notFoundError } from "../error/errorService.js";

export const deleteProductService = async (ID_product) => {
  try {
    // Obtengo el producto
    const product = await selectProductByIdModel(ID_product);

    // Verifico que existe el producto
    if (!product) {
      notFoundError("product");
    }

    // Elimino el producto
    const response = await deleteProductModel(ID_product);

    return response;
  } catch (error) {
    handleErrorService(
      error,
      "DELETE_PRODUCT_SERVICE_ERROR",
      "Error al elimniar un producto del servicio"
    );
  }
};
