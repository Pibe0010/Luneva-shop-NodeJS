import joi from "joi";
import { joiErrorMessages } from "../error/joiErrorMessages.js";

export const userSupportSchema = joi.object({
  user_name: joi.string().min(3).max(30).required().messages(joiErrorMessages),
  last_name: joi.string().min(3).max(30).required().messages(joiErrorMessages),
  email: joi.string().email().required().messages(joiErrorMessages),
  message: joi.string().min(10).max(100).required().messages(joiErrorMessages),
});
