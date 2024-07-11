import Joi from "joi";
import { joiErrorMessages } from "../error/joiErrorMessages.js";

export const recoveryPasswordSchema = Joi.object({
  email: Joi.string().email().required().messages(joiErrorMessages), // Correo electrónico válido y obligatorio
});
