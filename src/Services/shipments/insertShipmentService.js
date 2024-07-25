import { selectOrderByIdModel } from "../../Models/order/selectOrderByIdModel.js";
import { insertShipmentModel } from "../../Models/shipments/insertShipmentModel.js";
import { selectShimpmentByIdModel } from "../../Models/shipments/selectShimpmentByIdModel.js";
import { selectShippingAddressByIdModel } from "../../Models/shippingAddresses/selectShippingAddressByIdModel.js";

export const insertShipmentService = async (
  customer,
  ID_product,
  ID_shipment,
  ref
) => {
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
