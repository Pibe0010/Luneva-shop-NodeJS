import joi from "joi";
import { joiErrorMessages } from "../error/joiErrorMessages.js";

export const productUpdatedSchema = joi.object({
  name: joi.string().optional().min(3).max(30).messages(joiErrorMessages),
  description: joi.string().optional().messages(joiErrorMessages),
  price: joi.string().optional().messages(joiErrorMessages),
  stock: joi.number().optional().min(1).max(10000).messages(joiErrorMessages),
  category: joi.string().optional().min(3).max(30).messages(joiErrorMessages),
  active: joi.boolean().optional().messages(joiErrorMessages),
});
