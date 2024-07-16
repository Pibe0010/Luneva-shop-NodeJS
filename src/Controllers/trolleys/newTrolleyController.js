import { newTrolleySchema } from "../../Schemas/trolleys/newTrolleySchema.js";
import { insertProductTrolleyService } from "../../Services/trolleys/insertProductTrolleyService.js";
import { validateSchemaUtil } from "../../Utils/validateSchemaUtil.js";

export const newTrolleyController = async (req, res, next) => {
  try {
    // Obtengo l producto
    const { ID_product, products_amount } = req.body;

    // Obtengo el id del usuario
    const ID_user = req.user.ID_user;
    console.log(ID_user);

    // Valido el body
    await validateSchemaUtil(newTrolleySchema, req.body);

    // Insertamos el producto al carrito
    await insertProductTrolleyService(ID_user, ID_product, products_amount);

    res.status(201).send({
      status: "ok",
      message: "Producto añadido al carrito",
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};
