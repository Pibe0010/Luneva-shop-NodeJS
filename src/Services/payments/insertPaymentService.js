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
      // Creo el id del pago
      const ID_payment = crypto.randomUUID();

      // Obtengo la referencia maxima de los pagos
      const maxRef = await getMaxReference5Digits("Payments", "ref_PM");

      // Genero la referencia
      const ref = generateReference5DigitsFromRef("PM", maxRef);

      // Aplico el descuento al pago si el producto està en oferta
      if (orders.product_discount !== null) {
        // iva
        const iva = 0.21;

        // pago por envio
        const shipment_cost = 3.5;

        // Asegúrate de que el descuento es un número
        const discount = parseFloat(orders.product_discount);

        // Aplica el IVA sobre el descuento
        const total_price_with_iva = discount * iva;

        // Suma el descuento con el IVA
        const total_amount = parseFloat(
          discount + total_price_with_iva
        ).toFixed(2);

        // Precio total
        const total_price = total_amount + shipment_cost;
        console.log(total_price);

        // Inserta el pago en la BD
        await insertPaymentModel(
          ID_payment,
          ref,
          orders.ID_order,
          payment_method,
          total_price,
          iva,
          shipment_cost
        );
      } else if (orders.product_discount === null) {
        // iva
        const iva = 0.21;

        // pago por envio
        const shipment_cost = 3.5;

        // Asegúrate de que el precio es un número
        const price = parseFloat(orders.price);

        // Calcular el IVA sobre el precio original
        const total_price_with_iva = price * iva;

        // Sumar el precio original con el IVA para obtener el total
        const total_amount = price + total_price_with_iva;

        // Precio total
        const total_price = total_amount + shipment_cost;

        // Inserta el pago en la BD
        await insertPaymentModel(
          ID_payment,
          ref,
          orders.ID_order,
          payment_method,
          total_price,
          iva,
          shipment_cost
        );
      }

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
