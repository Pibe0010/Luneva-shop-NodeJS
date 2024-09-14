import { updatePaymentSchema } from "../../Schemas/payment/updatePaymentSchema.js";
import { updatePaymentService } from "../../Services/payments/updatePaymentService.js";
import { handleErrorController } from "../../Utils/handleError.js";
import { validateSchemaUtil } from "../../Utils/validateSchemaUtil.js";

export const updatePaymentController = async (req, res, next) => {
  try {
    // Validamos el body
    await validateSchemaUtil(updatePaymentSchema, req.body);

    // Obtenemos el pago
    const ID_payment = req.params.ID_payment;

    // Actualizamos el pago
    const response = await updatePaymentService(ID_payment, req.body);

    res.status(200).send({
      status: "ok",
      message: "Pago actualizado",
      data: response,
    });
  } catch (error) {
    handleErrorController(
      error,
      next,
      "UPDATE_PAYMENT_CONTROLLER_ERROR",
      "Error en el controlador al actualizar el pago"
    );
  }
};
