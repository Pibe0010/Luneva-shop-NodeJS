import { searchOfferByIdModel } from "../../Models/offers/searchOfferByIdModel.js";
import { selectOfferByIdModel } from "../../Models/offers/selectOfferByIdModel.js";
import { updateOfferModel } from "../../Models/offers/updateOfferModel.js";
import { notFoundError } from "../error/errorService.js";

export const updateOfferService = async (ID_product, body) => {
  const { discount_rate, start_date, ending_date } = body;

  // Buscamos la oferta
  const offer = await searchOfferByIdModel(ID_product);

  // Comprabamos si el oferta existe
  const ID_offer = await selectOfferByIdModel(offer.ID_offer);

  // Si existe comprobamos que es la misma oferta
  if (!ID_offer && ID_offer.ID_offer !== offer.ID_offer) {
    notFoundError("offer");
  }

  // Actualizo la oferta en la BD
  await updateOfferModel(
    offer.ID_offer,
    discount_rate,
    start_date,
    ending_date
  );

  // devolvemos la oferta actualizada
  const updatedOffer = await selectOfferByIdModel(offer.ID_offer);

  return updatedOffer;
};
