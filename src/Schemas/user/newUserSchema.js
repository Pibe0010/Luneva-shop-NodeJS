import joi from "joi";
import { joiErrorMessages } from "../error/joiErrorMessages.js";

export const newUserSchema = joi.object({
  user_name: joi.string().min(3).max(30).required().messages(joiErrorMessages),
  last_name: joi.string().min(3).max(30).required().messages(joiErrorMessages),
  email: joi.string().email().required().messages(joiErrorMessages),
  password: joi.string().min(6).max(60).required().messages(joiErrorMessages),
});
