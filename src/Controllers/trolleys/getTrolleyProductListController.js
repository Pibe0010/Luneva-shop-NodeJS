import { getTrolleyProductListService } from "../../Services/trolleys/getTrolleyProductListService.js";
import { handleErrorController } from "../../Utils/handleError.js";

export const getTrolleyProductListController = async (req, res, next) => {
  try {
    const ID_user = req.user.ID_user;

    const trolleyList = await getTrolleyProductListService(ID_user);

    res
      .status(200)
      .send({ status: "ok", message: "Lista del carrito", data: trolleyList });
  } catch (error) {
    handleErrorController(
      error,
      next,
      "GET_TROLLEY_PRODUCT_LIST_CONTROLLER_ERROR",
      "Error en el controlador al obtener la lista de productos del carrito"
    );
  }
};
