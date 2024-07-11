import Joi from "joi";
import { joiErrorMessages } from "../error/joiErrorMessages.js";

export const changeResetPasswordSchema = Joi.object({
  newPassword: Joi.string()
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]+$/)
    .required()
    .messages(joiErrorMessages),
  repeatPassword: Joi.string()
    .valid(Joi.ref("newPassword"))
    .required()
    .messages(joiErrorMessages),
});
