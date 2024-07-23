import { getOrderSearchService } from "../../Services/order/getOrderSearchService.js";

export const getOrderSearchController = async (req, res, next) => {
  try {
    // Obtengo el termino de busqueda
    const searchTerm = req.query.searchTerm;

    const response = await getOrderSearchService(searchTerm);

    res.status(201).send({ status: "ok", data: response });
  } catch (error) {
    console.error(error);
    next(error);
  }
};
