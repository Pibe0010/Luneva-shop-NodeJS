import { selectProductListService } from "../../Services/product/selectProductListService.js";
import { handleErrorController } from "../../Utils/handleError.js";

export const productListController = async (req, res, next) => {
  try {
    // Obtengo la lista de productos
    const response = await selectProductListService();

    res.status(201).send({ status: "ok", data: response });
  } catch (error) {
    handleErrorController(
      error,
      next,
      "GET_PRODUCT_LIST_CONTROLLER_ERROR",
      "Error en el controlador al obtener la lista de productos"
    );
  }
};
