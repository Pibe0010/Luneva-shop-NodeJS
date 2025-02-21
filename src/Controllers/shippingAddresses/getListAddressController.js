import { getListAddressService } from "../../Services/shippingAddresses/getListAddressService.js";
import { handleErrorController } from "../../Utils/handleError.js";

export const getListAddressController = async (req, res, next) => {
  try {
    // Obtenemos la lista de direcciones de envios
    const addressList = await getListAddressService();

    res.status(200).send({
      status: "ok",
      message: "Lista de direcciones de envios",
      data: addressList,
    });
  } catch (error) {
    handleErrorController(
      error,
      next,
      "GET_ADDRESS_LIST_CONTROLLER_ERROR",
      "Error en el controlador al obtener la lista de direcciónes de envio"
    );
  }
};
