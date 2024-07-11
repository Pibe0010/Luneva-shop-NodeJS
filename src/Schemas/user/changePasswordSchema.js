import Joi from "joi";
import { joiErrorMessages } from "../error/joiErrorMessages.js";

export const changePasswordSchema = Joi.object({
  currentPassword: Joi.string().required(),
  newPassword: Joi.string()
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]+$/)
    .required()
    .messages(joiErrorMessages),
});
