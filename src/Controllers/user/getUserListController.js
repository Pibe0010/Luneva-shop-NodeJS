import { getUserListService } from "../../Services/user/getUserListService.js";
import { handleErrorController } from "../../Utils/handleError.js";

export const getUserListController = async (req, res, next) => {
  try {
    const usersList = await getUserListService();

    res.status(200).send({ status: "ok", usersList });
  } catch (error) {
    handleErrorController(
      error,
      next,
      "GET_USER_LIST_CONTROLLER_ERROR",
      "Error en el controlador al obtener la lista de usuarios"
    );
  }
};
