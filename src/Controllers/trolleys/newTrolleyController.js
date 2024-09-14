import { newTrolleySchema } from "../../Schemas/trolleys/newTrolleySchema.js";
import { insertProductTrolleyService } from "../../Services/trolleys/insertProductTrolleyService.js";
import { handleErrorController } from "../../Utils/handleError.js";
import { validateSchemaUtil } from "../../Utils/validateSchemaUtil.js";

export const newTrolleyController = async (req, res, next) => {
  try {
    // Obtengo el usuario
    const ID_user = req.user.ID_user;

    // Valido el body
    await validateSchemaUtil(newTrolleySchema, req.body);

    // Insertamos el producto al carrito
    await insertProductTrolleyService(ID_user, req.body);

    res.status(201).send({
      status: "ok",
      message: "Producto añadido al carrito",
    });
  } catch (error) {
    handleErrorController(
      error,
      next,
      "NEW_TROLLEY_CONTROLLER_ERROR",
      "Error en el controlador de registro de producto en el carrito"
    );
  }
};
