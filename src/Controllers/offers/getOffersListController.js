import { getOffersListService } from "../../Services/offers/getOffersListService.js";
import { handleErrorController } from "../../Utils/handleError.js";

export const getOffersListController = async (req, res, next) => {
  try {
    // Obtenemos todas la ofertas
    const listOffers = await getOffersListService();

    res.status(200).send({ status: "ok", offersList: listOffers });
  } catch (error) {
    handleErrorController(
      error,
      next,
      "GET_OFFERS_LIST_CONTROLLER_ERROR",
      "Error en el controlador al obtener la lista de ofertas"
    );
  }
};
