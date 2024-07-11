export const logoutUserController = (req, res, next) => {
  try {
    // eliminar el token de la cookie
    res.clearCookie("token");

    res
      .status(200)
      .send({ status: "ok", message: "Sesión cerrada correctamente" });
  } catch (error) {
    console.error(error);
    next(error);
  }
};
