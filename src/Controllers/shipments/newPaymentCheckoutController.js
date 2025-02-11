import { STRIPE_KEY } from "../../../env.js";
import { handleErrorController } from "../../Utils/handleError.js";
import Stripe from "stripe";
import { validateSchemaUtil } from "../../Utils/validateSchemaUtil.js";
import { newPaymentCheckoutSchema } from "../../Schemas/payment/newPaymentCheckoutSchema.js";
import { newPaymentCheckoutService } from "../../Services/payments/newPaymentCheckoutService.js";

export const newPaymentCheckoutController = async (req, res, next) => {
  try {
    const stripe = new Stripe(`${STRIPE_KEY}`);

    // Validamos el body
    await validateSchemaUtil(newPaymentCheckoutSchema, req.body);

    // Verifico el pago
    const response = await newPaymentCheckoutService(stripe, req.body);

    res.status(200).send({
      status: "ok",
      message: "Pago relizado con exito.",
      data: response,
    });
  } catch (error) {
    handleErrorController(
      error,
      next,
      "NEW_PAYMENT_CHECKOUT_CONTROLLER_ERROR",
      "Error en el controlador de Chequeo de un pago"
    );
  }
};
