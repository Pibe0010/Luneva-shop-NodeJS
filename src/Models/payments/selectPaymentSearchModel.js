import { getPool } from "../../database/getPool.js";
import { databaseQueryError } from "../../Services/error/errorDataBase.js";

export const selectPaymentSearchModel = async (searchTerm) => {
  try {
    const pool = await getPool();

    const [result] = await pool.query(
      `
      SELECT p.ID_payment, p.ref_PM, p.payment_method, p.status, p.total_amount, p.iva_payments,
      o.ID_order, o.ref_OR, o.ID_customer, o.ID_product, o.product_amount, o.price, 
      o.status AS order_status, c.phone, u.user_name, u.last_name, u.email, 
      pr.name, pr.price AS product_price, p.createdAt, p.updatedAt
      FROM Payments p
      LEFT JOIN Orders o ON p.ID_order = o.ID_order
      LEFT JOIN Customers c ON o.ID_customer = c.ID_customer
      LEFT JOIN Users u ON c.ID_user = u.ID_user
      LEFT JOIN Products pr ON o.ID_product = pr.ID_product 
      WHERE p.ref_PM LIKE ? OR pr.name LIKE ? OR u.user_name LIKE ? OR u.last_name LIKE ? OR u.email LIKE ?`,
      [
        `%${searchTerm}%`,
        `%${searchTerm}%`,
        `%${searchTerm}%`,
        `%${searchTerm}%`,
        `%${searchTerm}%`,
      ]
    );

    if (!result || result.length === 0) {
      databaseQueryError("No se encontraron la listas de busquedas de pagos");
    }

    return result;
  } catch (error) {
    databaseQueryError(
      "Error en el modelo en la base de datos al buscar los pagos"
    );
  }
};
