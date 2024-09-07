import { deleteShippingAddressService } from "../../Services/shippingAddresses/deleteShippingAddressService.js";
import { handleErrorController } from "../../Utils/handleError.js";

export const deleteShippingAddressController = async (req, res, next) => {
  try {
    // Obtengo el id del usuario
    const ID_user = req.user.ID_user;

    // Eliminamos la direccion de envio
    await deleteShippingAddressService(ID_user);

    res.status(201).send({
      status: "ok",
      message: "Direccion de envio eliminada con exito",
    });
  } catch (error) {
    handleErrorController(
      error,
      next,
      "DELETE_SHIPMENT_ADDRESS_CONTROLLER_ERROR",
      "Error en el controlador al eliminar un dirección de envio"
    );
  }
};
