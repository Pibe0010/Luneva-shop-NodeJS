import { deleteCustomerModel } from "../../Models/customer/deleteCustomerModel.js";
import { selectCustomerByIdModel } from "../../Models/customer/selectCustomerByIdModel.js";
import { handleErrorService } from "../../Utils/handleError.js";

export const deleteCustomerService = async (ID_user) => {
  try {
    // Obtengo el cliente
    const customer = await selectCustomerByIdModel(ID_user);

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
