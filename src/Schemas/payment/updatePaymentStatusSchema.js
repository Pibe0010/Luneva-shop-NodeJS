import Joi from "joi";

export const updatePaymentStatusSchema = Joi.object({
  status: Joi.string()
    .valid("pending", "paid", "cancelled")
    .required()
    .messages({
      "any.only": "Introduce un estado válido (pending, paid, cancelled)",
    }),
});
