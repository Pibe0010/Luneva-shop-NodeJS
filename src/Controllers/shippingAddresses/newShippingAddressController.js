import { newShippingAddressSchema } from "../../Schemas/shippingAddresse/newShippingAddressSchema.js";
import { insertShippingAddressService } from "../../Services/shippingAddresses/insertShippingAddressService.js";
import { handleErrorController } from "../../Utils/handleError.js";
import { validateSchemaUtil } from "../../Utils/validateSchemaUtil.js";

export const newShippingAddressController = async (req, res, next) => {
  try {
    // Validamos el body
    await validateSchemaUtil(newShippingAddressSchema, req.body);

    // Obtengo el id del usuario
    const ID_user = req.user.ID_user;

    // Insertamos la direccion de envio en la BD
    await insertShippingAddressService(ID_user, req.body);

    res.status(201).send({
      status: "ok",
      message: "Direccion de envio creada con exito",
    });
  } catch (error) {
    handleErrorController(
      error,
      next,
      "NEW_SHIPMENT_ADDRESS_CONTROLLER_ERROR",
      "Error en el controlador de registro de un dirección de envio"
    );
  }
};
