import joi from "joi";

export const cancelPaymentSchema = joi.object({
  status: joi
    .string()
    .valid("pending", "cancelled", "paid")
    .required()
    .messages({
      "any.only": "Introduce un estado válido (pending, cancelled, paid)",
    }),
});
