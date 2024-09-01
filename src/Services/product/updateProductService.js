import { selectProductByIdModel } from "../../Models/product/selectProductByIdModel.js";
import { updateProductModel } from "../../Models/product/updateProductModel.js";
import { handleErrorService } from "../../Utils/handleError.js";
import { notFoundError } from "../error/errorService.js";

export const updateProductService = async (ID_product, body) => {
  try {
    const { name, description, price, stock, category, active } = body;

    // Compravamos si el producto existe
    const productExist = await selectProductByIdModel(ID_product);

    // Comprobamos si es el mismo producto
    if (productExist && productExist.ID_product !== ID_product) {
      notFoundError("product");
    }

    // Actualizamos el producto eln la base de datos
    await updateProductModel(
      ID_product,
      name,
      description,
      price,
      stock,
      category,
      active
    );

    // devolvemos el producto actualizado
    const product = await selectProductByIdModel(ID_product);

    return product;
  } catch (error) {
    handleErrorService(
      error,
      "UPDATE_PRODUCT_SERVICE_ERROR",
      "Error al actulizar el producto desde el servicio"
    );
  }
};
