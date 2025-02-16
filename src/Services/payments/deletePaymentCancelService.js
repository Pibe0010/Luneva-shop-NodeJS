import { selectCustomerByIdModel } from "../../Models/customer/selectCustomerByIdModel.js";
import { selectPaymentByOrdersModel } from "../../Models/payments/selectPaymentbyOrder.js";
import { deletePaymentCancelModel } from "../../Models/payments/deletePaymentCancelModel.js";
import { handleErrorService } from "../../Utils/handleError.js";
import { notFoundError } from "../error/errorService.js";
import { selectShipmentByOrdersModel } from "../../Models/payments/selectShipmentByOrderModel.js";
import { selectOrderByOrderModel } from "../../Models/payments/selectOrderByOrder.js";
import { updateOrderStatusFromPaymentModel } from "../../Models/payments/updateOrderStatusFromPaymentModel.js";
import { updateShipmentStatusModel } from "../../Models/shipments/updateShipmentStatus.js";
import { changePaymentByOrderStatusModel } from "../../Models/payments/changePaymentByOrderStatusModel.js";

export const deletePaymentCancelService = async (user) => {
  try {
    // Obtengo cliente
    const customer = await selectCustomerByIdModel(user);

    if (!customer) {
      throw new Error("Cliente no encontrado");
    }

    // Obtengo todas las órdenes del cliente
    const orders = await selectOrderByOrderModel(customer.ID_customer);

    if (!orders.length) {
      throw new Error("El cliente no tiene órdenes");
    }

    // Cambio los estados de las órdenes a "cancelled"
    await Promise.all(
      orders.map((order) =>
        updateOrderStatusFromPaymentModel(order.ID_order, "cancelled")
      )
    );

    console.log("Ordenes cambiaron a estado cancelado");

    // Volver a consultar las órdenes actualizadas
    const updatedOrders = await selectOrderByOrderModel(customer.ID_customer);

    // Iterar sobre las órdenes actualizadas
    for (const order of updatedOrders) {
      // Obtengo los envíos de esta orden
      const shipments = await selectShipmentByOrdersModel(order.ID_order);

      await Promise.all(
        shipments.map((shipment) =>
          updateShipmentStatusModel(shipment.ID_shipment, "cancelled")
        )
      );

      // Volver a obtener los envíos para verificar
      const updatedShipments = await selectShipmentByOrdersModel(
        order.ID_order
      );

      if (updatedShipments.some((s) => s.status !== "cancelled")) {
        notFoundError("cancelled");
        continue;
      }

      // Obtengo los pagos de esta orden
      const payments = await selectPaymentByOrdersModel(order.ID_order);
      console.log(payments);

      await Promise.all(
        payments.map((payment) =>
          changePaymentByOrderStatusModel(payment.ID_payment, "cancelled")
        )
      );

      // Volver a obtener los pagos para verificar
      const updatedPayments = await selectPaymentByOrdersModel(order.ID_order);

      if (updatedPayments.some((p) => p.status !== "cancelled")) {
        notFoundError("cancelled");
        continue;
      }

      // Elimino los pagos
      const status = "earring";
      await deletePaymentCancelModel(
        order.ID_order,
        status,
        payments[0].ID_payment
      );
    }
  } catch (error) {
    handleErrorService(
      error,
      "DELETE_PAYMENT_CANCEL_SERVICE_ERROR",
      "Error en el servicio al cancelar un pago"
    );
  }
};
