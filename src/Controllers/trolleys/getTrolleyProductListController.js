import { getTrolleyProductListService } from "../../Services/trolleys/getTrolleyProductListService.js";

export const getTrolleyProductListController = async (req, res, next) => {
  try {
    const ID_user = req.user.ID_user;

    const trolleyList = await getTrolleyProductListService(ID_user);

    res
      .status(200)
      .send({ status: "ok", message: "Lista del carrito", data: trolleyList });
  } catch (error) {
    console.error(error);
    next(error);
  }
};
