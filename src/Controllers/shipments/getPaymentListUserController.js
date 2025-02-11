import { getPaymentListUserService } from "../../Services/payments/getPaymentListUserService.js";
import { handleErrorController } from "../../Utils/handleError.js";

export const getPaymentListUserController = async (req, res, next) => {
  try {
    // Obtengo la lista de pagos
    const paymentList = await getPaymentListUserService();

    res.status(200).send({ status: "ok", data: paymentList });
  } catch (error) {
    handleErrorController(
      error,
      next,
      "GET_PAYMENT_LIST_USER_CONTROLLER_ERROR",
      "Error en el controlador al obtener la lista de pagos del usuario"
    );
  }
};
