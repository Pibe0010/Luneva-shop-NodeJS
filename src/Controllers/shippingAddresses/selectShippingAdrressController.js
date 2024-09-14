import { selectShippingAdrressSchema } from "../../Schemas/shippingAddresse/selectShippingAdrressSchema.js";
import { selectShippingAdrressService } from "../../Services/shippingAddresses/selectShippingAdrressService.js";
import { handleErrorController } from "../../Utils/handleError.js";
import { validateSchemaUtil } from "../../Utils/validateSchemaUtil.js";

export const selectShippingAdrressController = async (req, res, next) => {
  try {
    // Validamos el body
    await validateSchemaUtil(selectShippingAdrressSchema, req.body);

    // Selecciono la direccion de envio
    const selectAddress = await selectShippingAdrressService(req.body);

    res.status(200).send({
      status: "ok",
      message: "Direccion de envio seleccionada con exito",
      data: { selectAddress },
    });
  } catch (error) {
    handleErrorController(
      error,
      next,
      "GET_SHIPMENT_ADDRESS_CONTROLLER_ERROR",
      "Error en el controlador al obtener la dirección"
    );
  }
};
