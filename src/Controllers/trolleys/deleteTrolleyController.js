import { deleteTrolleyService } from "../../Services/trolleys/deleteTrolleyService.js";

export const deleteTrolleyController = async (req, res, next) => {
  try {
    // Obtengo id del usuario
    const ID_user = req.user.ID_user;

    const ID_product = req.params.id_product;

    // Borramos el carrito
    const response = await deleteTrolleyService(ID_user, ID_product);

    res.status(201).send({ status: "ok", data: response });
  } catch (error) {
    console.error(error);
    next(error);
  }
};
