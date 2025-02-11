import { getPool } from "../../database/getPool.js";
import { databaseQueryError } from "../../Services/error/errorDataBase.js";

export const getPaymentsListUserModel = async () => {
  try {
    const pool = await getPool();

    const query = `
      SELECT p.ID_payment, p.ref_PM, p.payment_method, p.status, p.total_amount, p.iva_payments, p.shipment_cost,
      o.ID_order, o.ref_OR, o.ID_customer, o.ID_product, o.product_amount, o.price, 
      o.status AS order_status, o.product_discount, c.phone, u.user_name, u.last_name, u.email, 
      pr.name, pr.price AS product_price, p.createdAt, p.updatedAt
      FROM Payments p
      LEFT JOIN Orders o ON p.ID_order = o.ID_order
      LEFT JOIN Customers c ON o.ID_customer = c.ID_customer
      LEFT JOIN Users u ON c.ID_user = u.ID_user
      LEFT JOIN Products pr ON o.ID_product = pr.ID_product
      WHERE p.status = "pending"
      `;

    const [result] = await pool.query(query);

    if (!result || result.length === 0) {
      databaseQueryError("No se encontraron la listas de pagos del usuario");
    }

    return result;
  } catch (error) {
    databaseQueryError(
      "Error en el modelo al obtener la lista de pagos del usuario"
    );
  }
};
