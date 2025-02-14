import { getPool } from "../../database/getPool.js";
import { databaseQueryError } from "../../Services/error/errorDataBase.js";

export const selectOrderByOrderModel = async (ID_customer) => {
  try {
    const pool = await getPool();

    const [result] = await pool.query(
      `SELECT ID_order, status FROM Orders WHERE ID_customer = ? `,
      [ID_customer]
    );

    if (result.length === 0) {
      return null;
    }

    return result;
  } catch (error) {
    databaseQueryError(
      error.message ||
        "Error en el modelo al seleccionar la ordenes de un cliente"
    );
  }
};
