import { selectShippingAdrressSchema } from "../../Schemas/shippingAddresse/selectShippingAdrressSchema.js";
import { selectShippingAdrressService } from "../../Services/shippingAddresses/selectShippingAdrressService.js";
import { validateSchemaUtil } from "../../Utils/validateSchemaUtil.js";

export const selectShippingAdrressController = async (req, res, next) => {
  try {
    // Validamos el body
    await validateSchemaUtil(selectShippingAdrressSchema, req.body);

    // Selecciono la direccion de envio
    const selectAddress = await selectShippingAdrressService(req.body);

    res.status(201).send({
      status: "ok",
      message: "Direccion de envio seleccionada con exito",
      data: { selectAddress },
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};
