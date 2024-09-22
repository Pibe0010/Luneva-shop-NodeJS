import { getPool } from "../../database/getPool.js";
import { databaseQueryError } from "../../Services/error/errorDataBase.js";

export const selectShipmentSearchModel = async (searchTerm) => {
  try {
    const pool = await getPool();
    console.log(searchTerm);

    const [result] = await pool.query(
      `SELECT s.ID_shipment, s.ref_SH, s.ID_order, s.ID_order, s.status AS shipment_status, s.createdAt, o.ref_OR,o.product_discount, o.product_amount, o.price AS order_price, o.status AS order_status, p.name, p.price AS product_price, sa.address, sa.street_number, sa.floor, sa.ladder_door, sa.city, sa.postal_code, sa.country, u.user_name, u.last_name, u.email
      FROM Shipments s 
      LEFT JOIN Orders o ON s.ID_order = o.ID_order
      LEFT JOIN Products p ON o.ID_product = p.ID_product
      LEFT JOIN Shipping_addresses sa ON s.ID_shipping_address = sa.ID_address
      LEFT JOIN Customers c ON o.ID_customer = c.ID_customer
      LEFT JOIN Users u ON c.ID_user = u.ID_user 
      WHERE s.ref_SH LIKE ? OR u.user_name LIKE ? OR u.last_name LIKE ? OR u.email LIKE ?`,
      [
        `%${searchTerm}%`,
        `%${searchTerm}%`,
        `%${searchTerm}%`,
        `%${searchTerm}%`,
      ]
    );

    if (result.length === 0) {
      return null;
    }

    return result;
  } catch (error) {
    databaseQueryError(
      error.message ||
        "Error al obtener la lista de busquedas de envios desde el modelo"
    );
  }
};
