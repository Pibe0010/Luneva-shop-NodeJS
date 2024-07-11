import joi from "joi";
import { joiErrorMessages } from "../error/joiErrorMessages.js";

export const newProductSchema = joi.object({
  name: joi.string().required().min(3).max(30).messages(joiErrorMessages),
  description: joi.string().optional().messages(joiErrorMessages),
  price: joi.string().required().messages(joiErrorMessages),
  stock: joi.number().required().min(1).max(10000).messages(joiErrorMessages),
  category: joi.string().required().min(3).max(30).messages(joiErrorMessages),
  active: joi.boolean().required().messages(joiErrorMessages),
});
