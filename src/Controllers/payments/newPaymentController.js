import { newPaymentSchema } from "../../Schemas/payment/newPaymentSchema.js";
import { insertPaymentService } from "../../Services/payments/insertPaymentService.js";
import { handleErrorController } from "../../Utils/handleError.js";
import { validateSchemaUtil } from "../../Utils/validateSchemaUtil.js";

export const newPaymentController = async (req, res, next) => {
  try {
    // Validamos el body
    await validateSchemaUtil(newPaymentSchema, req.body);

    // Obtengo el id del cliente
    const ID_user = req.user.ID_user;

    // Insertamos el pago
    const response = await insertPaymentService(ID_user, req.body);

    res.status(201).send({
      status: "ok",
      message: "Pago creado con exito",
      data: { response },
    });
  } catch (error) {
    handleErrorController(
      error,
      next,
      "INSERT_PAYMENT_CONTROLLER_ERROR",
      "Error en el controlador al insertar el pago"
    );
  }
};
