import { updatePaymentStatusSchema } from "../../Schemas/payment/updatePaymentStatusSchema.js";
import { updatePaymentStatusService } from "../../Services/payments/updatePaymentStatusService.js";
import { handleErrorController } from "../../Utils/handleError.js";
import { validateSchemaUtil } from "../../Utils/validateSchemaUtil.js";

export const updatePaymentStatusController = async (req, res, next) => {
  try {
    // Valido el body
    await validateSchemaUtil(updatePaymentStatusSchema, req.body);

    // Obtengo la pago
    const ID_payment = req.params.ID_payment;

    // Actualizo el estado de le pago
    const response = await updatePaymentStatusService(ID_payment, req.body);

    res.status(200).send({
      status: "ok",
      message: "Pago actualizada",
      data: response,
    });
  } catch (error) {
    handleErrorController(
      error,
      next,
      "UPDATE_ORDER_STATUS_CONTROLLER_ERROR",
      "Error en el controlador al modificar el estado de un pago"
    );
  }
};
