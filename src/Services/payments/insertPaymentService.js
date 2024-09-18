import { selectCustomerByIdModel } from "../../Models/customer/selectCustomerByIdModel.js";
import { getMaxReference5Digits } from "../../Models/getMaxRef.js";
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

    // Obtengo la ordenes del cliente
    const order = await selectPaymentOrdersFromCustomerModel(
      customer.ID_customer
    );

    // Almacenamos los pagos por orden
    const payments = [];

    // CReamos los pagos por cada orden del cliente
    for (const orders of order) {
      // iva
      const iva = 0.21;

      // Calculamos el iva
      const total_price = orders.price * iva;

      // Calculamos el total
      const total_amount = orders.price + total_price;

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
        orders.ID_order,
        total_amount,
        iva
      );

      // Actualiza el estado de la orden
      await updateOrderStatusFromPaymentModel(orders.ID_order, "sent");

      // Devolvemos el pago creado
      const response = await selectPaymentByIdModel(ID_payment);

      payments.push(response);
    }

    return payments;
  } catch (error) {
    handleErrorService(
      error,
      "INSERT_PAYMENT_SERVICE_ERROR",
      "Error en el servicio al insertar el pago en la base de datos"
    );
  }
};
