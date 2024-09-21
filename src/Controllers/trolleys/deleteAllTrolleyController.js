import { deleteAllTrolleyService } from "../../Services/trolleys/deleteAllTrolleyService.js";
import { handleErrorController } from "../../Utils/handleError.js";

export const deleteAllTrolleyController = async (req, res, next) => {
  try {
    // Obtengo el usuario
    const ID_user = req.user.ID_user;

    // Borramos el carro del carrito
    await deleteAllTrolleyService(ID_user);

    res.status(201).send({ status: "ok", message: "Carrito borrardo" });
  } catch (error) {
    handleErrorController(
      error,
      next,
      "DELETE_TROLLEY_CONTROLLER_ERROR",
      "Error en el controlador al eliminar el carrito"
    );
  }
};
