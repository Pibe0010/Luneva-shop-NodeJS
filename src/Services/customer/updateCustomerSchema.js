import Joi from "joi";
import { joiErrorMessages } from "../../Schemas/error/joiErrorMessages.js";

// Esquema para validar el body de la petición.
export const updateCustomerSchema = Joi.object({
  user_name: Joi.string().min(3).max(30).optional().messages(joiErrorMessages),
  last_name: Joi.string().min(3).max(30).optional().messages(joiErrorMessages),
  email: Joi.string()
    .email({ tlds: false })
    .optional()
    .messages(joiErrorMessages),
  phone: Joi.string().min(9).max(30).optional().messages(joiErrorMessages),
});
