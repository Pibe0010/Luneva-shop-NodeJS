import { getOffersListService } from "../../Services/offers/getOffersListService.js";

export const getOffersListController = async (req, res, next) => {
  try {
    const listOffers = await getOffersListService();

    res.status(201).send({ status: "ok", offersList: listOffers });
  } catch (error) {
    console.error(error);
    next(error);
  }
};
