import jwt from "jsonwebtoken";
import { selectUserByIdModel } from "../Models/user/selectUserByIdModel.js";
import { JTW_SECRET } from "../../env.js";

export const auththenticatedUser = async (req, res, next) => {
  try {
    const { authorization } = req.headers;

    // Verifica si se proporciono un token
    if (!authorization) {
      return res.status(401).send({ error: "No autorizado" });
    }

    //Verifico el token
    const decodeToken = jwt.verify(authorization, JTW_SECRET);
    //Si el token es valido, añadir el id de usuario decodificado a la solicitud
    req.userId = decodeToken.ID_user;
    req.user = decodeToken;

    // Verifico si el usuario existe en la base de datos
    const user = await selectUserByIdModel(req.userId);
    if (!user)
      return res
        .status(401)
        .send({ message: "Token de autenticación inválido" });

    next();
  } catch (error) {
    console.log(error);
    return res.status(401).send({ error: "Token de autenticación inválido" });
  }
};
