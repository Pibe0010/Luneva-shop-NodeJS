import { deleteUserModel } from "../../Models/user/deleteUserModel.js";
import { selectUserByIdModel } from "../../Models/user/selectUserByIdModel.js";

export const deleteUserController = async (req, res, next) => {
  try {
    const ID_user = req.params.id_user;

    // Verificamos si existe el usuario
    const userExist = await selectUserByIdModel(ID_user);

    if (ID_user !== userExist.ID_user) {
      return res.status(404).send({
        error: "El usuario no existe",
      });
    }

    // Borramos el usuario
    await deleteUserModel(ID_user);

    res.status(201).send({ status: "ok", message: "Usuario eliminado" });
  } catch (error) {
    console.error(error);
    next(error);
  }
};
