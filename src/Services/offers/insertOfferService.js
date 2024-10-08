import { insertOfferModel } from "../../Models/offers/insertOfferModel.js";
import { selectOfferByIdModel } from "../../Models/offers/selectOfferByIdModel.js";
import { handleErrorService } from "../../Utils/handleError.js";

export const insertOfferService = async (body) => {
  try {
    const { ID_product, discount_rate, start_date, ending_date } = body;

    // creamos el id de la oferta
    const ID_offer = crypto.randomUUID();

    // insertamos la oferta en la BD
    await insertOfferModel(
      ID_offer,
      ID_product,
      discount_rate,
      start_date,
      ending_date
    );

    // devolvemos la oferta creada
    const offer = await selectOfferByIdModel(ID_offer);

    return offer;
  } catch (error) {
    handleErrorService(
      error,
      "NEW_OFFER_SERVICE_ERROR",
      "Error al insertar una oferta desde el servicio"
    );
  }
};
