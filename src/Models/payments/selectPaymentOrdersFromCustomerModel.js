import { getPool } from "../../database/getPool.js";
import { databaseQueryError } from "../../Services/error/errorDataBase.js";

export const selectPaymentOrdersFromCustomerModel = async (ID_customer) => {
  try {
    const pool = await getPool();

    const [result] = await pool.query(
      `SELECT ID_order, product_discount, product_amount,  price
       FROM Orders
       WHERE ID_customer = ? AND status = "earring"`,
      [ID_customer]
    );

    if (result.length === 0) {
      return null;
    }

    return result;
  } catch (error) {
    databaseQueryError(
      "Error en el modelo al obtener la orden de pago de un cliente"
    );
  }
};
