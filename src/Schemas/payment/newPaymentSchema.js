import joi from "joi";

export const newPaymentSchema = joi.object({
  payment_method: joi
    .string()
    .valid("card", "transfer", "Paypal")
    .required()
    .messages({
      "any.only": "Introduce un estado válido (card, transfer, Paypal)",
    }),
});
