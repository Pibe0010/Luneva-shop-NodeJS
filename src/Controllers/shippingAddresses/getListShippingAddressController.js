import { getListShippingAddressService } from "../../Services/shippingAddresses/getListShippingAddressService.js";
import { handleErrorController } from "../../Utils/handleError.js";

export const getListShippingAddressController = async (req, res, next) => {
  try {
    // Obtengo el usuario
    const ID_user = req.user.ID_user;

    // Obtenemos la lista de direcciones de envios
    const addressList = await getListShippingAddressService(ID_user);

    res.status(200).send({
      status: "ok",
      message: "Lista de direcciones de envios",
      data: addressList,
    });
  } catch (error) {
    handleErrorController(
      error,
      next,
      "GET_SHIPMENT_ADDRESS_LIST_CONTROLLER_ERROR",
      "Error en el controlador al obtener la lista de direcciónes de envio"
    );
  }
};
