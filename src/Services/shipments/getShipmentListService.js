import { getShipmentListModel } from "../../Models/shipments/getShipmentListModel.js";

export const getShipmentListService = async () => {
  const shipments = await getShipmentListModel();

  return shipments;
};
