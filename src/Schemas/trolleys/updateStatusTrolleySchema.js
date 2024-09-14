import joi from "joi";

export const updateStatusTrolleySchema = joi.object({
  process: joi
    .string()
    .valid("active", "abandoned", "empty")
    .required()
    .messages({
      "any.only": "Introduce un estado válido (active, abandoned, empty)",
    }),
});
