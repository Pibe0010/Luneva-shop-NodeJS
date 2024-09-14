import { selectCustomerByIdModel } from "../../Models/customer/selectCustomerByIdModel.js";
import { getMaxReference5Digits } from "../../Models/getMaxRef.js";
import { updateOrderStatusModel } from "../../Models/order/updateOrderStatusModel.js";
import { insertPaymentModel } from "../../Models/payments/insertPaymentModel.js";
import { selectPaymentByIdModel } from "../../Models/payments/selectPaymentByIdModel.js";
import { selectPaymentOrdersFromCustomerModel } from "../../Models/payments/selectPaymentOrdersFromCustomerModel.js";
import { updateOrderStatusFromPaymentModel } from "../../Models/payments/updateOrderStatusFromPaymentModel.js";
import { generateReference5DigitsFromRef } from "../../Utils/generateReferenceDigits.js";
import { handleErrorService } from "../../Utils/handleError.js";

export const insertPaymentService = async (ID_user, body) => {
  try {
    // Obtengo el cuerpo de la petición
    const { payment_method } = body;

    // Obtengo el cliente
    const customer = await selectCustomerByIdModel(ID_user);

    // Obtengo la orden del cliente
    const order = await selectPaymentOrdersFromCustomerModel(
      customer.ID_customer
    );

    // iva
    const iva = 0.21;

    // Calculamos el iva
    const total_price = order.price * iva;

    // Calculamos el total
    const total_amount = order.price + total_price;

    // Creo el id del pago
    const ID_payment = crypto.randomUUID();

    // Obtengo la referencia maxima de los pagos
    const maxRef = await getMaxReference5Digits("Payments", "ref_PM");

    // Genero la referencia
    const ref = generateReference5DigitsFromRef("PM", maxRef);

    // Inserto el pago en la BD
    await insertPaymentModel(
      ID_payment,
      ref,
      payment_method,
      order.ID_order,
      total_amount,
      iva
    );

    // Actualiza el estado de la orden
    await updateOrderStatusFromPaymentModel(order.ID_order, "sent");

    // Devolvemos el pago creado
    const response = await selectPaymentByIdModel(ID_payment);

    return response;
  } catch (error) {
    handleErrorService(
      error,
      "INSERT_PAYMENT_SERVICE_ERROR",
      "Error en el servicio al insertar el pago en la base de datos"
    );
  }
};
