import joi from "joi";
import { joiErrorMessages } from "../error/joiErrorMessages.js";

export const SaleProductSchema = joi.object({
  amount: joi.string().required().min(1).max(300).messages(joiErrorMessages),
});
