import { getPool } from "../../database/getPool.js";
import { databaseQueryError } from "../../Services/error/errorDataBase.js";

export const selectShimpmentByIdModel = async (ID_shipment) => {
  try {
    const pool = getPool();

    const [shipment] = await pool.query(
      `SELECT ID_shipment, ref_SH, Shipments.shipping_date AS creacion_envio, Shipments.status AS status, Orders.ID_product, Products.name, Orders.product_amount, shipping_addresses.address, shipping_addresses.street_number, shipping_addresses.floor, shipping_addresses.ladder_door, shipping_addresses.postal_code, shipping_addresses.city, shipping_addresses.country FROM Shipments 
      LEFT JOIN Orders ON Orders.ID_order = Shipments.ID_order 
      LEFT JOIN Products ON Orders.ID_product = Products.ID_product 
      LEFT JOIN Shipping_addresses ON Shipping_addresses.ID_address = Shipments.ID_shipping_address 
      WHERE ID_shipment = ?`,
      [ID_shipment]
    );

    return shipment[0];
  } catch (error) {
    databaseQueryError("Error al obtener un envio desde el modelo");
  }
};
