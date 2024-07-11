import { getProductSearchService } from "../../Services/product/getProductSearchService.js";

export const getProductSearchController = async (req, res, next) => {
  try {
    const searchTerm = req.query.searchTerm;
    console.log(searchTerm);

    const response = await getProductSearchService(searchTerm);

    res
      .status(200)
      .send({ status: "ok", message: "lista Productos", data: response });
  } catch (error) {
    console.error(error);
    next(error);
  }
};
