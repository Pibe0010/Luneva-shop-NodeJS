import { getCustomerSearchService } from "../../Services/customer/getCustomerSearchService.js";

export const getCustomerSearchController = async (req, res, next) => {
  try {
    const searchTerm = req.query.searchTerm;
    console.log(searchTerm);

    const response = await getCustomerSearchService(searchTerm);

    res.status(201).send({ status: "ok", data: response });
  } catch (error) {
    console.error(error);
    next(error);
  }
};
