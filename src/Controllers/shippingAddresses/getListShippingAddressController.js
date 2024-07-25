import { getListShippingAddressService } from "../../Services/shippingAddresses/getListShippingAddressService.js";

export const getListShippingAddressController = async (req, res, next) => {
  try {
    // Obtengo el id del usuario
    const ID_user = req.user.ID_user;

    // Obtenemos la lista de direcciones de envios
    const addressList = await getListShippingAddressService(ID_user);

    res.status(201).send({
      status: "ok",
      message: "Lista de direcciones de envios",
      data: addressList,
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};
