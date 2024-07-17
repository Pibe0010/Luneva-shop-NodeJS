import joi from "joi";
import { joiErrorMessages } from "../error/joiErrorMessages.js";

export const updateTrolleySchema = joi.object({
  ID_product: joi
    .string()
    .guid({ version: ["uuidv4", "uuidv5"] })
    .required()
    .messages(joiErrorMessages),
  products_amount: joi.string().required().messages(joiErrorMessages),
});
