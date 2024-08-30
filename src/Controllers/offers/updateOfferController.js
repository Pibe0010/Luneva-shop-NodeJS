import { updateOfferSchema } from "../../Schemas/offers/updateOfferSchema.js";
import { updateOfferService } from "../../Services/offers/updateOfferService.js";
import { handleErrorService } from "../../Utils/handleError.js";
import { validateSchemaUtil } from "../../Utils/validateSchemaUtil.js";

export const updateOfferController = async (req, res, next) => {
  try {
    // validamos el body
    await validateSchemaUtil(updateOfferSchema, req.body);

    // Obtenemos el id del producto
    const ID_product = req.params.id_product;

    // Actualizamos la oferta
    const offer = await updateOfferService(ID_product, req.body);

    res
      .status(201)
      .send({ status: "ok", message: "Oferta actualizada", data: offer });
  } catch (error) {
    handleErrorService(
      error,
      next,
      "UPDATE_CUSTOMER_CONTROLLER_ERROR",
      "Error en el controlador al modificar una oferta"
    );
  }
};
