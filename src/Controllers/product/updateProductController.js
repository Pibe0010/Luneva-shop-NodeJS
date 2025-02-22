import { updateImgProductService } from "../../Services/product/updateImgProductService.js";
import { validateSchemaUtil } from "../../Utils/validateSchemaUtil.js";
import { updateProductService } from "../../Services/product/updateProductService.js";
import { handleErrorController } from "../../Utils/handleError.js";
import { updateProductSchema } from "../../Schemas/product/updateProductSchema.js";

export const updateProductController = async (req, res, next) => {
  try {
    // Validamos el body
    await validateSchemaUtil(updateProductSchema, req.body);
    await validateSchemaUtil(updateProductSchema, req.files || {});

    // Obtenemos el producto
    const ID_product = req.params.ID_product;

    let message = "";
    let data = {};

    // Actualizamos la fotos del producto
    if (req.files !== undefined) {
      const productName = await updateImgProductService(
        ID_product,
        req.files.image_one,
        req.files.image_two,
        req.files.image_three,
        100
      );
      message += "Foto de producto actualizado";
      data.productName = productName;
    }

    // Actualizamos el producto en la BD
    const product = await updateProductService(ID_product, req.body);
    message += "Producto actualizado";
    data.product = product;

    res.send({
      status: "ok",
      message: message.trim(),
      data: data,
    });
  } catch (error) {
    handleErrorController(
      error,
      next,
      "UPDATE_PRODUCT_CONTROLLER_ERROR",
      "Error en el controlador al modificar un producto"
    );
  }
};
