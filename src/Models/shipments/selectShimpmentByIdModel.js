import { getPool } from "../../database/getPool.js";

export const selectShimpmentByIdModel = async (ID_shipment) => {
  const pool = getPool();

  const [shipment] = await pool.query(
    `SELECT ID_shipment, ref_SH, Shipments.shipping_date AS creacion_envio, Products.name, Orders.product_amount, shipping_addresses.address, shipping_addresses.street_number, shipping_addresses.floor, shipping_addresses.ladder_door, shipping_addresses.postal_code, shipping_addresses.city, shipping_addresses.country FROM Shipments 
    LEFT JOIN Orders ON Orders.ID_order = Shipments.ID_order 
    LEFT JOIN Products ON Orders.ID_product = Products.ID_product 
    LEFT JOIN Shipping_addresses ON Shipping_addresses.ID_address = Shipments.ID_shipping_address 
    WHERE ID_shipment = ?`,
    [ID_shipment]
  );

  return shipment[0];
};
