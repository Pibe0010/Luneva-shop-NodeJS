import joi from "joi";
import { joiErrorMessages } from "../error/joiErrorMessages.js";

export const updateShippingAddressSchema = joi.object({
  address: joi.string().optional().min(3).max(30).messages(joiErrorMessages),
  street_number: joi.optional().optional().messages(joiErrorMessages),
  floor: joi.string().optional().messages(joiErrorMessages),
  ladder_door: joi
    .number()
    .optional()
    .min(1)
    .max(10)
    .messages(joiErrorMessages),
  city: joi.string().optional().min(3).max(30).messages(joiErrorMessages),
  postal_code: joi.string().optional().messages(joiErrorMessages),
  country: joi.string().optional().messages(joiErrorMessages),
});
