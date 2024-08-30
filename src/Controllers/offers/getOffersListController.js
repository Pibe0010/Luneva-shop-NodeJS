import { getOffersListService } from "../../Services/offers/getOffersListService.js";
import { handleErrorController } from "../../Utils/handleError.js";

export const getOffersListController = async (req, res, next) => {
  try {
    const listOffers = await getOffersListService();

    res.status(201).send({ status: "ok", offersList: listOffers });
  } catch (error) {
    handleErrorController(
      error,
      next,
      "GET_CUSTOMER_LIST_CONTROLLER_ERROR",
      "Error en el controlador al obtener la lista de ofertas"
    );
  }
};
