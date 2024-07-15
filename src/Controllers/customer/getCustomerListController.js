import { selectVustomerListService } from "../../Services/customer/selectVustomerListService.js";

export const getCustomerListController = async (req, res, next) => {
  try {
    const customerList = await selectVustomerListService();

    res.status(201).send({
      status: "ok",
      data: customerList,
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};
