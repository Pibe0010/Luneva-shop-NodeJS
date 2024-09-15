import { selectCustomerByIdModel } from "../../Models/customer/selectCustomerByIdModel.js";
import { selectTrolleyByIdCustomerModel } from "../../Models/trolleys/selectTrolleyByIdCustomerModel.js";
import { selectTrolleyByIdModel } from "../../Models/trolleys/selectTrolleyByIdModel.js";
import { updateTrolleyStatusModel } from "../../Models/trolleys/updateTrolleyStatusModel.js";
import { handleErrorService } from "../../Utils/handleError.js";

export const updateTrolleyStatusService = async (ID_user, ID_product, body) => {
  try {
    const { process } = body;

    // Obtengo el cliente
    const customer = await selectCustomerByIdModel(ID_user);

    // Obtengo el carrito
    const trolley = await selectTrolleyByIdCustomerModel(
      customer.ID_customer,
      ID_product
    );

    // Actualizo el estado del carrito
    await updateTrolleyStatusModel(trolley.ID_trolley, process);

    // Devuelvo el carrito actualizado
    const response = await selectTrolleyByIdModel(trolley.ID_trolley);

    return response;
  } catch (error) {
    handleErrorService(
      error,
      "UPDATE_STATUS_TROLLEY_SERVICE_ERROR",
      "Error al actulizar el estado del carrito desde el servicio"
    );
  }
};
