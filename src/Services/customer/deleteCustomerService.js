import { deleteCustomerModel } from "../../Models/customer/deleteCustomerModel.js";
import { selectCustomerByIdFromDeleteModel } from "../../Models/customer/selectCustomerByIdFromDeleteModel.js";
import { handleErrorService } from "../../Utils/handleError.js";
import { notFoundError } from "../error/errorService.js";

export const deleteCustomerService = async (ID_user) => {
  try {
    // Obtengo el cliente
    const customer = await selectCustomerByIdFromDeleteModel(ID_user);

    // Verifico que el cliente exista
    if (!customer) {
      notFoundError("cliente");
    }

    // Elimino el cliente
    const deleteCustomer = await deleteCustomerModel(customer.ID_user);

    return deleteCustomer;
  } catch (error) {
    handleErrorService(
      error,
      "DELETE_CUSTOMER_SERVICE_ERROR",
      "Error al elimniar un cliente del servicio"
    );
  }
};
