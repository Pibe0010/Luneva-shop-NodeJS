import joi from "joi";
import { joiErrorMessages } from "../error/joiErrorMessages.js";

export const selectShippingAdrressSchema = joi.object({
  address: joi
    .string()
    .guid({ version: ["uuidv4", "uuidv5"] })
    .required()
    .messages(joiErrorMessages),
});
