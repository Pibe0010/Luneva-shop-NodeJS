import { updateShippingAddressSchema } from "../../Schemas/shippingAddresse/updateShippingAddressSchema.js";
import { updateShippingAddressService } from "../../Services/shippingAddresses/updateShippingAddressService.js";
import { handleErrorController } from "../../Utils/handleError.js";
import { validateSchemaUtil } from "../../Utils/validateSchemaUtil.js";

export const updateShippingAddressController = async (req, res, next) => {
  try {
    // Validamos el body
    await validateSchemaUtil(updateShippingAddressSchema, req.body);

    // Obtengo el id del usuario
    const ID_user = req.user.ID_user;

    // Actualizamos la direccion de envio en la BD
    const updateAddress = await updateShippingAddressService(ID_user, req.body);

    res.status(200).send({
      status: "ok",
      message: "Direccion de envio actualizada con exito",
      data: { updateAddress },
    });
  } catch (error) {
    handleErrorController(
      error,
      next,
      "UPDATE_SHIPMENT_ADDRESS_CONTROLLER_ERROR",
      "Error en el controlador al modificar la dirección"
    );
  }
};
