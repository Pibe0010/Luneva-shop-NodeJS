import { deleteShippingAddressService } from "../../Services/shippingAddresses/deleteShippingAddressService.js";

export const deleteShippingAddressController = async (req, res, next) => {
  try {
    // Obtengo el id del usuario
    const ID_user = req.user.ID_user;
    console.log(ID_user);

    // Eliminamos la direccion de envio
    await deleteShippingAddressService(ID_user);

    res.status(201).send({
      status: "ok",
      message: "Direccion de envio eliminada con exito",
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};
