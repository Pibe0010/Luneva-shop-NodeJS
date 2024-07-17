import { updateTrolleySchema } from "../../Schemas/trolleys/updateTrolleySchema.js";
import { updateTrolleyService } from "../../Services/trolleys/updateTrolleyService.js";
import { validateSchemaUtil } from "../../Utils/validateSchemaUtil.js";

export const updateTrolleyController = async (req, res, next) => {
  try {
    // Validamos el body
    await validateSchemaUtil(updateTrolleySchema, req.body);

    // Obtenemos los id
    const ID_user = req.user.ID_user;

    // Actualizamos el carrito
    const trolley = await updateTrolleyService(ID_user, req.body);

    res
      .status(201)
      .send({ status: "ok", message: "Carrito actualizado", data: trolley });
  } catch (error) {
    console.error(error);
    next(error);
  }
};
