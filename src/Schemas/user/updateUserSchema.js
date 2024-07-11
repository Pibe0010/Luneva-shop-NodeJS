import joi from "joi";
import { joiErrorMessages } from "../error/joiErrorMessages.js";
import { imgSchema } from "../error/imgSchema.js";

// Esquema para validar el body de la petición.
export const updateUserSchema = joi.object({
  user_name: joi.string().min(3).max(30).optional().messages(joiErrorMessages),
  last_name: joi.string().min(3).max(30).optional().messages(joiErrorMessages),
  email: joi.string().email().optional().messages(joiErrorMessages),
  role: joi.string().valid("customer", "admin").optional().messages({
    "any.only": "Debe ser uno de los siguientes valores: customer, admin.",
  }),
  avatar: imgSchema.optional(),
});
