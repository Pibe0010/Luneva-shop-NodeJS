import { getShipmentListService } from "../../Services/shipments/getShipmentListService.js";

export const getListShipmentController = async (req, res, next) => {
  try {
    const shipmentList = await getShipmentListService();

    res.status(200).send({
      status: "ok",
      data: shipmentList,
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};
