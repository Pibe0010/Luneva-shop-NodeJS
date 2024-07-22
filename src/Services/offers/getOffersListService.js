import { getOffersListModel } from "../../Models/offers/getOffersListModel.js";

export const getOffersListService = async () => {
  // Obtenemos todas la ofertas
  const offersList = await getOffersListModel();

  return offersList;
};
