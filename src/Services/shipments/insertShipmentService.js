import { getMaxReference5Digits } from "../../Models/getMaxRef.js";
import { generateReference5DigitsFromRef } from "../../Utils/generateReferenceDigits.js";
import { insertShipmentModel } from "../../Models/shipments/insertShipmentModel.js";
import { selectShimpmentByIdModel } from "../../Models/shipments/selectShimpmentByIdModel.js";
import { handleErrorService } from "../../Utils/handleError.js";
import { selectCustomerByIdModel } from "../../Models/customer/selectCustomerByIdModel.js";
import { selectOrderForShipingModel } from "../../Models/shipments/selectOrderForShipingModel.js";
import { selectAddressFromShipmentModel } from "../../Models/shipments/selectAddressFromShipmentModel.js";

export const insertShipmenService = async (customer) => {
  try {
    // Obtengo el cliente
    const response = await selectCustomerByIdModel(customer);

    // Busco la orden para el envio
    const order = await selectOrderForShipingModel(response.ID_customer);

    // Lista para almacenar los envios por cada orden del cliente
    const shipments = [];

    // Creo un envio por cada orden del cliente creada listas para enviar
    for (const orders of order) {
      // Obtengo la direccion de envio
      const address = await selectAddressFromShipmentModel(orders.ID_customer);

      // Creamos el id del envio
      const ID_shipment = crypto.randomUUID();

      // Creamos la referencia del envio
      // Obtengo la referencia maxima de los productos
      const maxRef = await getMaxReference5Digits("Shipments", "ref_SH");

      // Genero la referencia
      const ref = generateReference5DigitsFromRef("SH", maxRef);

      // Inserto el envio en la BD
      await insertShipmentModel(
        ID_shipment,
        ref,
        orders.ID_order,
        address.ID_address
      );

      const shipment = await selectShimpmentByIdModel(ID_shipment);

      // Agrego el envio a la lista de envios
      shipments.push(shipment);
    }

    return shipments;
  } catch (error) {
    handleErrorService(
      error,
      "NEW_SHIPMENT_SERVICE_ERROR",
      "Error al insertar el envio desde el servicio"
    );
  }
};
