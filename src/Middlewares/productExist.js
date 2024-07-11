import { notFoundError } from "../Controllers/mainController.js";
import { selectSaleProductByIdService } from "../Services/product/selectSaleProductByIdService.js";

export const productExist = async (req, res, next) => {
  try {
    // Obtener el id del servicio de la URL.
    const productId = req.params.product_Id;

    // Comprobar si existe un producto con el id proporcionado.
    const product = await selectSaleProductByIdService(productId);

    // Si no se encuentra el producto, lanzar un error.
    if (product) {
      notFoundError("Producto");
    }

    // Pasar el control al siguiente middleware.
    next();
  } catch (error) {
    next(error);
  }
};
