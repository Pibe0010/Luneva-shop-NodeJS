import joi from "joi";
import { joiErrorMessages } from "../error/joiErrorMessages.js";

export const newOfferSchema = joi.object({
  ID_product: joi
    .string()
    .guid({ version: ["uuidv4", "uuidv5"] })
    .required()
    .messages(joiErrorMessages),
  discount_rate: joi.string().required().messages(joiErrorMessages),
  start_date: joi.string().required().messages(joiErrorMessages),
  ending_date: joi.string().required().messages(joiErrorMessages),
});
