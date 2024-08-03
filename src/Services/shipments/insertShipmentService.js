import { getMaxReference5Digits } from "../../Models/getMaxRef.js";
import { generateReference5DigitsFromRef } from "../../Utils/generateReferenceDigits.js";
import { selectOrderByIdModel } from "../../Models/order/selectOrderByIdModel.js";
import { selectShippingAddressByIdModel } from "../../Models/shippingAddresses/selectShippingAddressByIdModel.js";
import { insertShipmentModel } from "../../Models/shipments/insertShipmentModel.js";
import { selectShimpmentByIdModel } from "../../Models/shipments/selectShimpmentByIdModel.js";

export const insertShipmenService = async (customer, ID_product) => {
  // Creamos el id del envio
  const ID_shipment = crypto.randomUUID();

  // Creamos la referencia del envio
  // Obtengo la referencia maxima de los productos
  const maxRef = await getMaxReference5Digits("Shipments", "ref_SH");

  // Genero la referencia
  const ref = generateReference5DigitsFromRef("SH", maxRef);

  // Busco la orden de envio
  const order = await selectOrderByIdModel(ID_product);

  // Obtengo la direccion de envio
  const address = await selectShippingAddressByIdModel(customer);

  // Inserto el envio en la BD
  await insertShipmentModel(
    ID_shipment,
    ref,
    order.ID_order,
    address.ID_address
  );

  const shipment = selectShimpmentByIdModel(ID_shipment);

  return shipment;
};
