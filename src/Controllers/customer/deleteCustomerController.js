import { deleteCustomerService } from "../../Services/customer/deleteCustomerService.js";
import { handleErrorController } from "../../Utils/handleError.js";

export const deleteCustomerController = async (req, res, next) => {
  try {
    // Obtengo el id del cliente
    const ID_user = req.user.ID_user;

    // Elimino el cliente
    const customer = await deleteCustomerService(ID_user);

    res.status(201).send({ status: "ok", message: customer });
  } catch (error) {
    handleErrorController(
      error,
      next,
      "DELETE_CUSTOMER_CONTROLLER_ERROR",
      "Error en el controlador al eliminar un cliente"
    );
  }
};
