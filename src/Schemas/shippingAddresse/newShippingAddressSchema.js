import joi from "joi";
import { joiErrorMessages } from "../error/joiErrorMessages.js";

export const newShippingAddressSchema = joi.object({
  address: joi.string().required().min(3).max(30).messages(joiErrorMessages),
  street_number: joi.string().required().messages(joiErrorMessages),
  floor: joi.string().optional().messages(joiErrorMessages),
  ladder_door: joi
    .number()
    .optional()
    .min(1)
    .max(10)
    .messages(joiErrorMessages),
  city: joi.string().required().min(3).max(30).messages(joiErrorMessages),
  postal_code: joi.string().required().messages(joiErrorMessages),
  country: joi.string().required().messages(joiErrorMessages),
});
