import { selectProductListModel } from "../../Models/product/selectProductListModel.js";

export const productListController = async (req, res, next) => {
  try {
    const productList = await selectProductListModel();

    res.status(201).send({ status: "ok", data: productList });
  } catch (error) {
    console.error(error);
    next(error);
  }
};
