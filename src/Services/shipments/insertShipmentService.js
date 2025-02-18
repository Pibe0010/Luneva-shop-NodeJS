import { getMaxReference5Digits } from "../../Models/getMaxRef.js";
import { generateReference5DigitsFromRef } from "../../Utils/generateReferenceDigits.js";
import { insertShipmentModel } from "../../Models/shipments/insertShipmentModel.js";
import { selectShimpmentByIdModel } from "../../Models/shipments/selectShimpmentByIdModel.js";
import { handleErrorService } from "../../Utils/handleError.js";
import { selectCustomerByIdModel } from "../../Models/customer/selectCustomerByIdModel.js";
import { selectOrderForShipingModel } from "../../Models/shipments/selectOrderForShipingModel.js";
import { selectAddressFromShipmentModel } from "../../Models/shipments/selectAddressFromShipmentModel.js";

export const insertShipmenService = async (customer, body) => {
  try {
    const { ID_address } = body;
    console.log(customer, body);

    // Lista para almacenar los envíos por cada orden del cliente
    const shipments = [];

    // Si hay dirección de envío
    if (ID_address) {
      // Obtengo el cliente
      const response = await selectCustomerByIdModel(customer);

      // Busco la orden para el envío
      const order = await selectOrderForShipingModel(response.ID_customer);
      const uniqueOrders = [
        ...new Map(order.map((item) => [item.ID_order, item])).values(),
      ];

      // Obtenemos la última referencia en la base de datos
      let maxRef = await getMaxReference5Digits("Shipments", "ref_SH");

      // Si no hay referencia en la base de datos, comenzamos con la primera referencia
      if (!maxRef) {
        maxRef = "SH-AA00000";
      }

      // Procesamos cada orden de forma secuencial
      for (const orders of uniqueOrders) {
        // Creamos el id del envío
        const ID_shipment = crypto.randomUUID();

        // Generamos la nueva referencia
        const ref = generateReference5DigitsFromRef("SH", maxRef);

        // Actualizamos maxRef para la siguiente referencia
        maxRef = ref;

        // Insertamos el envío en la BD
        await insertShipmentModel(
          ID_shipment,
          ref,
          orders.ID_order,
          ID_address
        );

        // Obtenemos el envío insertado
        const shipment = await selectShimpmentByIdModel(ID_shipment);

        // Agregamos el envío a la lista de envíos
        shipments.push(shipment);
      }
    } else {
      // Si no hay ID de dirección de envío, obtenemos el cliente
      const response = await selectCustomerByIdModel(customer);
      const order = await selectOrderForShipingModel(response.ID_customer);
      const uniqueOrders = [
        ...new Map(order.map((item) => [item.ID_order, item])).values(),
      ];

      // Obtenemos la última referencia en la base de datos
      let maxRef = await getMaxReference5Digits("Shipments", "ref_SH");

      // Si no hay referencia en la base de datos, comenzamos con la primera referencia
      if (!maxRef) {
        maxRef = "SH-AA00000";
      }

      // Procesamos cada orden de forma secuencial
      for (const orders of uniqueOrders) {
        // Obtengo la dirección de envío
        const address = await selectAddressFromShipmentModel(
          orders.ID_customer
        );

        // Creamos el id del envío
        const ID_shipment = crypto.randomUUID();

        // Generamos la nueva referencia
        const ref = generateReference5DigitsFromRef("SH", maxRef);

        // Actualizamos maxRef para la siguiente referencia
        maxRef = ref;

        // Insertamos el envío en la BD
        await insertShipmentModel(
          ID_shipment,
          ref,
          orders.ID_order,
          address.ID_address
        );

        // Obtenemos el envío insertado
        const shipment = await selectShimpmentByIdModel(ID_shipment);

        // Agregamos el envío a la lista de envíos
        shipments.push(shipment);
      }
    }

    return shipments;
  } catch (error) {
    handleErrorService(
      error,
      "NEW_SHIPMENT_SERVICE_ERROR",
      "Error al insertar el envío desde el servicio"
    );
  }
};
