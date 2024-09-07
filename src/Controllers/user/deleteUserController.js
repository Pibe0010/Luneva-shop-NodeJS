import { deleteUserService } from "../../Services/user/deleteUserService.js";
import { handleErrorController } from "../../Utils/handleError.js";

export const deleteUserController = async (req, res, next) => {
  try {
    const ID_user = req.params.id_user;

    // Eliminamos el usuario
    await deleteUserService(ID_user);

    res.status(200).send({ status: "ok", message: "Usuario eliminado" });
  } catch (error) {
    handleErrorController(
      error,
      next,
      "DELETE_USER_CONTROLLER_ERROR",
      "Error en el controlador al eliminar un usuario"
    );
  }
};
