import { deleteOfferModel } from "../../Models/offers/deleteOfferModel.js";
import { selectOfferByIdModel } from "../../Models/offers/selectOfferByIdModel.js";
import { handleErrorService } from "../../Utils/handleError.js";
import { notFoundError } from "../error/errorService.js";

export const deleteOfferService = async (ID_offer) => {
  try {
    // Obtengo la oferta
    const offer = await selectOfferByIdModel(ID_offer);

    // Compruebo si la oferta existe
    if (!offer) {
      notFoundError("offer");
    }

    // Elimino la oferta
    const response = await deleteOfferModel(ID_offer);

    return response;
  } catch (error) {
    handleErrorService(
      error,
      "DELETE_OFFER_SERVICE_ERROR",
      "Error al elimniar una oferta del servicio"
    );
  }
};
