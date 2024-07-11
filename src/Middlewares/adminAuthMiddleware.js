export const adminAuthMiddleware = (req, res, next) => {
  try {
    if (!req.user || req.user.role !== "admin") {
      return res.status(403).send({ message: "No tienes permisos" });
    }
    next();
  } catch (error) {
    return res
      .status(500)
      .send({ message: "Error en la verificación de permisos" });
  }
};
