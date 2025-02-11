import joi from "joi";

export const newPaymentCheckoutSchema = joi.object({
  shippingCost: joi
    .number()
    .optional()
    .messages({ "any.only": "Monto requerido" }),
  amount: joi.number().required().messages({ "any.only": "Monto requerido" }),
  products: joi
    .array()
    .required()
    .messages({ "any.only": "Productos requeridos" }),
  discountOffer: joi
    .number()
    .optional()
    .min(0)
    .messages({ "any.only": "Monto requerido" }),
  discountCupon: joi
    .number()
    .optional()
    .min(0)
    .messages({ "any.only": "Monto requerido" }),
  taxIva: joi.number().required().messages({ "any.only": "Monto requerido" }),
});
