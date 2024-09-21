import joi from "joi";

export const updateOrderStatusSchema = joi.object({
  status: joi
    .string()
    .valid("earring", "sent", "delivered", "cancelled")
    .required()
    .messages({
      "any.only":
        "Introduce un estado válido (earring, sent, delivered, cancelled)",
    }),
});
