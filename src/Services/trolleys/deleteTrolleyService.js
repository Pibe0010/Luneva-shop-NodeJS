import { selectCustomerByIdModel } from "../../Models/customer/selectCustomerByIdModel.js";
import { deleteTrolleyModel } from "../../Models/trolleys/deleteTrolleyModel.js";
import { selectTrolleyByIdModel } from "../../Models/trolleys/selectTrolleyByIdModel.js";
import { updateProductStockDeleteModel } from "../../Models/trolleys/updateProductStockDeleteModel.js";
import { handleErrorService } from "../../Utils/handleError.js";
import { notFoundError } from "../error/errorService.js";

export const deleteTrolleyService = async (ID_user) => {
  try {
    // Obtenemos el cliente
    const customer_id = await selectCustomerByIdModel(ID_user);

    // Obtengo el carrito
    const trolley = await selectTrolleyByIdModel(customer_id.ID_customer);

    if (!trolley) {
      notFoundError("trolley");
    }

    // Actualizamos el stock del producto
    await updateProductStockDeleteModel(trolley.ID_trolley);

    // eliminamos el carrito
    const response = await deleteTrolleyModel(trolley.ID_trolley);

    return response;
  } catch (error) {
    handleErrorService(
      error,
      "DELETE_TROLLEY_SERVICE_ERROR",
      "Error al elimniar el carrito del servicio"
    );
  }
};
