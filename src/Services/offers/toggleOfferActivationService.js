import { selectOfferByIdModel } from "../../Models/offers/selectOfferByIdModel.js";
import { toggleActiveOfferModel } from "../../Models/offers/toggleActiveModel.js";
import { notFoundError } from "../error/errorService.js";

export const toggleOfferActivationService = async (ID_offer, active) => {
  // Compruebo si existe el producto
  const product = await selectOfferByIdModel(ID_offer);

  if (!product) {
    notFoundError("offert");
  }

  // Actualizo el estado de la oferta
  await toggleActiveOfferModel(ID_offer, active);

  // Devuelvo el nuevo estado de la oferta
  const offerUpdated = await selectOfferByIdModel(ID_offer);

  return offerUpdated;
};
