import { cancelPaymentSchema } from "../../Schemas/payment/cancelPaymentSchema.js";
import { cancelPaymentService } from "../../Services/payments/cancelPaymentService.js";
import { handleErrorController } from "../../Utils/handleError.js";
import { validateSchemaUtil } from "../../Utils/validateSchemaUtil.js";

export const cancelPaymentController = async (req, res, next) => {
  try {
    // Valido el body
    await validateSchemaUtil(cancelPaymentSchema, req.body);

    // Obtenemos el pago
    const ID_payment = req.params.ID_payment;

    // Cancelamos el pago
    const response = await cancelPaymentService(ID_payment, req.body);

    res.status(200).send({
      status: "ok",
      message: "Pago cancelado",
      data: response,
    });
  } catch (error) {
    handleErrorController(
      error,
      next,
      "CANCEl_PAYMENT_CONTROLLER_ERROR",
      "Error en el controlador al cancelar el pago"
    );
  }
};
