import { newOfferSchema } from "../../Schemas/offers/newOfferSchema.js";
import { insertOfferService } from "../../Services/offers/insertOfferService.js";
import { handleErrorController } from "../../Utils/handleError.js";
import { validateSchemaUtil } from "../../Utils/validateSchemaUtil.js";

export const newOfferController = async (req, res, next) => {
  try {
    // Validamos el body
    await validateSchemaUtil(newOfferSchema, req.body);

    // Insertamos la oferta en la BD
    const offer = await insertOfferService(req.body);

    res.status(201).send({
      status: "ok",
      message: "Oferta creada con exito",
      data: { offer },
    });
  } catch (error) {
    handleErrorController(
      error,
      next,
      "NEW_OFFER_CONTROLLER_ERROR",
      "Error en el controlador de registro de una oferta"
    );
  }
};
