import { SaleProductSchema } from "../../Schemas/product/selectSaleProductSchema.js";
import { limitedStockError } from "../../Services/error/errorService.js";
import { controlStockProductService } from "../../Services/product/controlStockProductService.js";
import { insertOrderProductService } from "../../Services/product/insertOrderProductService.js";
import { selectSaleProductByIdService } from "../../Services/product/selectSaleProductByIdService.js";
import { validateSchemaUtil } from "../../Utils/validateSchemaUtil.js";

export const selectSaleProductController = async (req, res, next) => {
  try {
    // Obtengo el poducto selectcionado
    const productId = req.params.product_id;
    const { amount } = req.body;

    // Obtengo el id del usuario
    const ID_user = req.user.ID_user;

    // Obtengo el producto de la BD
    await selectSaleProductByIdService(productId);

    // Validamos el body
    await validateSchemaUtil(SaleProductSchema, req.body);

    // Compruebo el monto y si hay stock suficiente
    const checkQuantity = await controlStockProductService(productId);
    const stock = JSON.parse(JSON.stringify(checkQuantity));

    if (stock < amount) {
      limitedStockError(amount);
    }

    // Coloco un id a la orden
    const orderId = crypto.randomUUID();

    // Inserto el producto en la BD
    const result = await insertOrderProductService(
      orderId,
      ID_user,
      productId,
      amount
    );

    res.status(201).send({
      status: "ok",
      message: "Orden creada con exito",
      data: { result },
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};
