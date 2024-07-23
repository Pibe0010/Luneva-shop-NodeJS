import { getOrderListService } from "../../Services/order/getOrderListService.js";

export const getOrderListController = async (req, res, next) => {
  try {
    const orderList = await getOrderListService();
    res.status(201).send({ status: "ok", data: orderList });
  } catch (error) {
    console.error(error);
    next(error);
  }
};
