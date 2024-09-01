import { toggleActivationProductService } from "../../Services/product/toggleActivationProductService.js";
import { handleErrorController } from "../../Utils/handleError.js";

export const toggleActivationController = async (req, res, next) => {
  try {
    // Obtengo el id del producto
    const ID_product = req.params.id_product;

    const { active } = req.body;

    // Desactivo el producto o lo activo
    const product = await toggleActivationProductService(ID_product, active);

    let isActive;
    let message;
    if (product.active === "true") {
      isActive = true;
      message = "El producto está activado.";
    } else {
      isActive = false;
      message = "El producto está desactivado.";
    }

    res
      .status(201)
      .send({ status: "ok", isActive: isActive, message: message });
  } catch (error) {
    handleErrorController(
      error,
      next,
      "TOGGLE_ACTIVE_PRODUCT_CONTROLLER_ERROR",
      "Error en el controlador al cambiar el estado de un producto"
    );
  }
};
