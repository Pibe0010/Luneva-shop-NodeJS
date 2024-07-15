import joi from "joi";
import { joiErrorMessages } from "../error/joiErrorMessages.js";

// Esquema para validar el body de la petición.
export const newCustomerSchema = joi.object({
  user_name: joi.string().min(3).max(30).required().messages(joiErrorMessages),
  last_name: joi.string().min(3).max(30).required().messages(joiErrorMessages),
  email: joi.string().email().required().messages(joiErrorMessages),
  phone: joi.string().min(9).max(30).optional().messages(joiErrorMessages),
});
