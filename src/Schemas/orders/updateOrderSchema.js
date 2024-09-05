import joi from "joi";
import { joiErrorMessages } from "../error/joiErrorMessages.js";

export const updateOrderSchema = joi.object({
  products_amount: joi.string().required().messages(joiErrorMessages),
});
