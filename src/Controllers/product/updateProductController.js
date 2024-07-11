import { updateImgProductService } from "../../Services/product/updateImgProductService.js";
import { updateProductSchema } from "../../Schemas/product/updateproductSchema.js";
import { validateSchemaUtil } from "../../Utils/validateSchemaUtil.js";
import { updateProductService } from "../../Services/product/updateproductService.js";

export const updateProductController = async (req, res, next) => {
  try {
    // Validamos el body
    await validateSchemaUtil(updateProductSchema, req.body);
    await validateSchemaUtil(updateProductSchema, req.files || {});

    // Obtenemos el id del producto
    const ID_product = req.params.product_id;

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
    console.error(error);
    next(error);
  }
};
