import { getMaxReference5Digits } from "../../Models/getMaxRef.js";
import { insertShipmentService } from "../../Services/shipments/insertShipmentService.js";
import { generateReference5DigitsFromRef } from "../../Utils/generateReferenceDigits.js";

export const newShipmentController = async (customer, ID_product) => {
  try {
    // Creamos el id del envio
    const ID_shipment = crypto.randomUUID();

    // Creamos la referencia del envio
    // Obtengo la referencia maxima de los productos
    const maxRef = await getMaxReference5Digits("Shipments", "ref_SH");

    // Genero la referencia
    const ref = generateReference5DigitsFromRef("SH", maxRef);

    // Insertamos el envio en la BD
    await insertShipmentService(customer, ID_product, ID_shipment, ref);
  } catch (error) {
    console.error(error);
  }
};
