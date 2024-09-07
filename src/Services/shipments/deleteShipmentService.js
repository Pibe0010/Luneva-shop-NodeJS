import { updateOrderStatusModel } from "../../Models/order/updateOrderStatusModel.js";
import { deleteShipmentModel } from "../../Models/shipments/deleteShipmentModel.js";
import { selectShimpmentByIdModel } from "../../Models/shipments/selectShimpmentByIdModel.js";
import { handleErrorService } from "../../Utils/handleError.js";
import { invalidStatusError, notFoundError } from "../error/errorService.js";

export const deleteShipmentService = async (ID_shipment) => {
  try {
    // Verifico que el envio existe
    const shipment = await selectShimpmentByIdModel(ID_shipment);

    if (!shipment) {
      notFoundError("envio");
    }

    // Verifico que el envio este cancelado
    if (shipment.status !== "cancelled") {
      invalidStatusError();
    }

    // Cancelo la orden de envio
    await updateOrderStatusModel(shipment.ID_product, "cancelled");

    // Elimino el envio
    await deleteShipmentModel(ID_shipment);
  } catch (error) {
    handleErrorService(
      error,
      "DELETE_SHIPMENT_SERVICE_ERROR",
      "Error al elimniar el envío del servicio"
    );
  }
};
