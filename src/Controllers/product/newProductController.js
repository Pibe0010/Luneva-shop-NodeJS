import { newProductSchema } from "../../Schemas/product/newProductSchema.js";
import { insertProductService } from "../../Services/product/insertProductService.js";
import { handleErrorController } from "../../Utils/handleError.js";
import { validateSchemaUtil } from "../../Utils/validateSchemaUtil.js";

export const newProductController = async (req, res, next) => {
  try {
    // validamos el body
    await validateSchemaUtil(newProductSchema, req.body);

    // Insertamos el producto en la BD
    await insertProductService(req.body);

    res.status(201).send({
      status: "ok",
      message: "Producto creado con exito",
    });
  } catch (error) {
    handleErrorController(
      error,
      next,
      "NEW_PRODUCT_CONTROLLER_ERROR",
      "Error en el controlador de registro de producto"
    );
  }
};
