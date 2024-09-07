import { handleErrorController } from "../../Utils/handleError.js";

export const logoutUserController = (req, res, next) => {
  try {
    // eliminar el token de la cookie
    res.clearCookie("token");

    res
      .status(200)
      .send({ status: "ok", message: "Sesión cerrada correctamente" });
  } catch (error) {
    handleErrorController(
      error,
      next,
      "LOGOUT_USER_CONTROLLER_ERROR",
      "Error en el controlador al hacer logout"
    );
  }
};
