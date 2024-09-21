import { deleteTrolleyService } from "../../Services/trolleys/deleteTrolleyService.js";
import { handleErrorController } from "../../Utils/handleError.js";

export const deleteTrolleyController = async (req, res, next) => {
  try {
    // Obtengo el usuario
    const ID_user = req.user.ID_user;

    // Obtengo el producto del carrito
    const ID_product = req.params.ID_product;

    // Borramos el producto del carrito
    const response = await deleteTrolleyService(ID_user, ID_product);

    res.status(201).send({ status: "ok", data: response });
  } catch (error) {
    handleErrorController(
      error,
      next,
      "DELETE_TROLLEY_CONTROLLER_ERROR",
      "Error en el controlador al eliminar un producto del carrito"
    );
  }
};
