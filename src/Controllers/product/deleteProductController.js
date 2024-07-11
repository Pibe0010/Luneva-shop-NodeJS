import { deleteProductService } from "../../Services/product/deleteProductService.js";

export const deleteProductController = async (req, res, next) => {
  try {
    // Obtengo el id del producto
    const ID_product = req.params.product_id;

    const response = await deleteProductService(ID_product);

    res.status(201).send({ status: "ok", message: response });
  } catch (error) {
    console.error(error);
    next(error);
  }
};
