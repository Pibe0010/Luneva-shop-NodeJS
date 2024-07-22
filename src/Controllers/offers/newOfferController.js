import { newOfferSchema } from "../../Schemas/offers/newOfferSchema.js";
import { insertOfferService } from "../../Services/offers/insertOfferService.js";
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
    console.error(error);
    next(error);
  }
};
