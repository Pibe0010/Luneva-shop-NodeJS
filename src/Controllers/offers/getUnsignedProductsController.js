import { getUnsignedProductsService } from "../../Services/offers/getUnsignedProductsService.js";
import { handleErrorController } from "../../Utils/handleError.js";

export const getUnsignedProductsController = async (req, res, next) => {
  try {
    const productsList = await getUnsignedProductsService();

    res.status(200).send({ status: "ok", data: productsList });
  } catch (error) {
    handleErrorController(
      error,
      next,
      "GET_UNSIGNED_PRODUCTS_CONTROLLER_ERROR",
      "Error en el controlador al obtener la lista de productos para la oferta"
    );
  }
};
