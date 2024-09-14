import { getPool } from "../../database/getPool.js";
import { databaseQueryError } from "../../Services/error/errorDataBase.js";

export const selectPaymentOrdersFromCustomerModel = async (ID_customer) => {
  try {
    const pool = await getPool();

    const [result] = await pool.query(
      `SELECT ID_order, product_amount, price
       FROM Orders o
       WHERE ID_customer = ?`,
      [ID_customer]
    );

    return result[0];
  } catch (error) {
    databaseQueryError(
      "Error en el modelo al obtener la orden de pago de un cliente"
    );
  }
};
