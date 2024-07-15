import { deleteCustomerService } from "../../Services/customer/deleteCustomerService.js";

export const deleteCustomerController = async (req, res, next) => {
  try {
    // Obtengo el id del cliente
    const ID_user = req.user.ID_user;
    console.log(ID_user);

    // Elimino el cliente
    const customer = await deleteCustomerService(ID_user);

    res.status(201).send({ status: "ok", message: customer });
  } catch (error) {
    console.error(error);
    next(error);
  }
};
