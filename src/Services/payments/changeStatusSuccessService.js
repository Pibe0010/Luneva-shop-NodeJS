import { selectCustomerByIdModel } from "../../Models/customer/selectCustomerByIdModel.js";
import { selectPaymentByOrdersModel } from "../../Models/payments/selectPaymentbyOrder.js";
import { selectPaymentOrdersFromCustomerModel } from "../../Models/payments/selectPaymentOrdersFromCustomerModel.js";
import { updateOrderStatusFromPaymentModel } from "../../Models/payments/updateOrderStatusFromPaymentModel.js";
import { updateStatusFromPaymentModel } from "../../Models/payments/updateStatusFromPaymentModel.js";
import { handleErrorService } from "../../Utils/handleError.js";
import { notFoundError } from "../error/errorService.js";
import { sendEmailTicketPurchaseService } from "../ticketPurchases/sendEmailTicketPurchaseService.js";

export const changeStatusSuccessService = async (ID_user) => {
  try {
    // Obtengo el cliente
    const customer = await selectCustomerByIdModel(ID_user);
    if (!customer) {
      notFoundError("cliente");
    }

    // Obtengo las órdenes del cliente
    const orders = await selectPaymentOrdersFromCustomerModel(
      customer.ID_customer
    );
    if (!orders || orders.length === 0) {
      notFoundError("ordenes");
    }

    // Obtengo todos los pagos de todas las órdenes
    const payments = await Promise.all(
      orders.map((order) => selectPaymentByOrdersModel(order.ID_order))
    );
    const allPayments = payments.flat(); // Convertimos array de arrays en un solo array

    // Cambio el estado de los pagos
    await Promise.all(
      allPayments.map((payment) =>
        updateStatusFromPaymentModel(payment.ID_payment, "paid")
      )
    );

    // Cambio el estado de las órdenes
    await Promise.all(
      orders.map((order) =>
        updateOrderStatusFromPaymentModel(order.ID_order, "sent")
      )
    );

    // Envío el ticket al usuario
    await sendEmailTicketPurchaseService(ID_user);
  } catch (error) {
    handleErrorService(
      error,
      "SUCCESS_PAYMENT_STATUS_SERVICE_ERROR",
      "Error en el servicio al cambiar el estado en la base de datos"
    );
  }
};
