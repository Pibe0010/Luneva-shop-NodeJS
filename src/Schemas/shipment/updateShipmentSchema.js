import joi from "joi";
import { joiErrorMessages } from "../error/joiErrorMessages.js";

export const updateShipmentSchema = joi.object({
  status: joi
    .string()
    .valid("pending", "sent", "delivered", "cancelled")
    .required()
    .messages(joiErrorMessages),
});
