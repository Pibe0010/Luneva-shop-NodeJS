import joi from "joi";
import { joiErrorMessages } from "../error/joiErrorMessages.js";

export const updateOfferSchema = joi.object({
  discount_rate: joi.string().optional().messages(joiErrorMessages),
  start_date: joi.string().optional().messages(joiErrorMessages),
  ending_date: joi.string().optional().messages(joiErrorMessages),
});
