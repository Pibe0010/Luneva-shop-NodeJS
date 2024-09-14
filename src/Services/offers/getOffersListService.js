import { getOffersListModel } from "../../Models/offers/getOffersListModel.js";
import { handleErrorService } from "../../Utils/handleError.js";

export const getOffersListService = async () => {
  try {
    // Obtenemos todas la ofertas
    const offersList = await getOffersListModel();

    return offersList;
  } catch (error) {
    handleErrorService(
      error,
      "GET_OFFERS_LIST_SERVICE_ERROR",
      "Error al obtener la lista de ofertas desde el servicio"
    );
  }
};
