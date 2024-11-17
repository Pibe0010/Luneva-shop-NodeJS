import { searchOfferByIdModel } from "../../Models/offers/searchOfferByIdModel.js";
import { selectOfferByIdModel } from "../../Models/offers/selectOfferByIdModel.js";
import { updateOfferModel } from "../../Models/offers/updateOfferModel.js";
import { handleErrorService } from "../../Utils/handleError.js";
import { notFoundError } from "../error/errorService.js";

export const updateOfferService = async (ID_offer, body) => {
  try {
    const { discount_rate, start_date, ending_date } = body;

    // Buscamos la oferta
    const offer = await searchOfferByIdModel(ID_offer);

    // Comprabamos si el oferta existe
    const response = await selectOfferByIdModel(offer.ID_offer);

    // Si existe comprobamos que es la misma oferta
    if (!response && response.ID_offer !== offer.ID_offer) {
      notFoundError("offer");
    }

    // Actualizo la oferta en la BD
    await updateOfferModel(ID_offer, discount_rate, start_date, ending_date);

    // devolvemos la oferta actualizada
    const updatedOffer = await selectOfferByIdModel(ID_offer);

    return updatedOffer;
  } catch (error) {
    handleErrorService(
      error,
      "UPDATE_OFFER_SERVICE_ERROR",
      "Error al actulizar la oferta desde el servicio"
    );
  }
};
