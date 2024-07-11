import { newProductSchema } from "../../Schemas/product/newProductSchema.js";
import { insertProductService } from "../../Services/product/insertProductService.js";
import { validateSchemaUtil } from "../../Utils/validateSchemaUtil.js";

export const newProductController = async (req, res, next) => {
  try {
    const { name, description, price, stock, category, active } = req.body;

    // validamos el body
    await validateSchemaUtil(newProductSchema, req.body);

    // Insertamos el producto en la BD
    await insertProductService(
      name,
      description,
      price,
      stock,
      category,
      active
    );

    res.status(201).send({
      status: "ok",
      message: "Producto creado con exito",
    });
  } catch (error) {
    console.error(error.message);
    next(error);
  }
};
