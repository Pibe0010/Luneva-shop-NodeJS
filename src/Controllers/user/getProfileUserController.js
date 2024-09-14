import { selectProfileUserService } from "../../Services/user/selectProfileUserService.js";
import { handleErrorController } from "../../Utils/handleError.js";

export const getProfileUserController = async (req, res, next) => {
  try {
    // Obtenemos el usuario
    const ID_user = req.user.id_user;

    const user = await selectProfileUserService(ID_user);

    res.status(200).send({
      status: "ok",
      data: user,
    });
  } catch (error) {
    handleErrorController(
      error,
      next,
      "Error del controlador en la obtencion del perfil del usuario"
    );
  }
};
