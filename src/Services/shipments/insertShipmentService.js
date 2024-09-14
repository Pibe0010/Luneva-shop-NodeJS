import { getMaxReference5Digits } from "../../Models/getMaxRef.js";
import { generateReference5DigitsFromRef } from "../../Utils/generateReferenceDigits.js";
import { selectShippingAddressByIdModel } from "../../Models/shippingAddresses/selectShippingAddressByIdModel.js";
import { insertShipmentModel } from "../../Models/shipments/insertShipmentModel.js";
import { selectShimpmentByIdModel } from "../../Models/shipments/selectShimpmentByIdModel.js";
import { selectProductByTrolleyModel } from "../../Models/shipments/selectProductByTrolleyModel.js";
import { handleErrorService } from "../../Utils/handleError.js";
import { selectCustomerByIdModel } from "../../Models/customer/selectCustomerByIdModel.js";
import { selectOrderForShipingModel } from "../../Models/shipments/selectOrderForShipingModel.js";

export const insertShipmenService = async (customer) => {
  try {
    // Obtengo el cliente
    const response = await selectCustomerByIdModel(customer);

    // Obtengo el producto del carrito
    const product = await selectProductByTrolleyModel(response.ID_customer);

    // Busco la orden para el envio
    const order = await selectOrderForShipingModel(product.ID_product);

    // Obtengo la direccion de envio
    const address = await selectShippingAddressByIdModel(response.ID_customer);

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
      order.ID_order,
      address.ID_address
    );

    const shipment = selectShimpmentByIdModel(ID_shipment);

    return shipment;
  } catch (error) {
    handleErrorService(
      error,
      "NEW_SHIPMENT_SERVICE_ERROR",
      "Error al insertar el envio desde el servicio"
    );
  }
};
