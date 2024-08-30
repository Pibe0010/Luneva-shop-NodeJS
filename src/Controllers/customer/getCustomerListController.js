import { selectCustomerListService } from "../../Services/customer/selectVustomerListService.js";
import { handleErrorController } from "../../Utils/handleError.js";

export const getCustomerListController = async (req, res, next) => {
  try {
    const customerList = await selectCustomerListService();

    res.status(201).send({
      status: "ok",
      data: customerList,
    });
  } catch (error) {
    handleErrorController(
      error,
      next,
      "GET_CUSTOMER_LIST_CONTROLLER_ERROR",
      "Error en el controlador al obtener la lista de clientes"
    );
  }
};
