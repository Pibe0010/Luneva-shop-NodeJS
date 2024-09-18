import { deleteShippingAddressService } from "../../Services/shippingAddresses/deleteShippingAddressService.js";
import { handleErrorController } from "../../Utils/handleError.js";

export const deleteShippingAddressController = async (req, res, next) => {
  try {
    // Obtengo la direccion de envio
    const ID_address = req.params.ID_address;

    // Eliminamos la direccion de envio
    await deleteShippingAddressService(ID_address);

    res.status(200).send({
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
