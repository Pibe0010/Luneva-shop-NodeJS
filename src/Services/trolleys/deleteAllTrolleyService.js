import { selectCustomerByIdModel } from "../../Models/customer/selectCustomerByIdModel.js";
import { deleteAllTrolleyModel } from "../../Models/trolleys/deleteAllTrolleyModel.js";
import { selectTrolleyByCustomerModel } from "../../Models/trolleys/selectTrolleyByCustomerModel.js";
import { handleErrorService } from "../../Utils/handleError.js";

export const deleteAllTrolleyService = async (ID_user) => {
  try {
    // Obtenemos el cliente
    const customer = await selectCustomerByIdModel(ID_user);

    // Obtenemos el carrito del cliente
    const trolley = await selectTrolleyByCustomerModel(customer.ID_customer);

    // Eliminamos el carrito
    for (const trolleys of trolley) {
      await deleteAllTrolleyModel(trolleys.ID_trolley);
    }
  } catch (error) {
    handleErrorService(
      error,
      "DELETE_TROLLEY_SERVICE_ERROR",
      "Error al elimniar el carrito en el servicio"
    );
  }
};
