import { getPaymentListService } from "../../Services/payments/getPaymentListService.js";
import { handleErrorController } from "../../Utils/handleError.js";

export const getPaymentListController = async (req, res, next) => {
  try {
    const paymentList = await getPaymentListService();

    res.status(200).send({ status: "ok", data: paymentList });
  } catch (error) {
    handleErrorController(
      error,
      next,
      "GET_PAYMENT_LIST_CONTROLLER_ERROR",
      "Error en el controlador al obtener la lista de pagos"
    );
  }
};
