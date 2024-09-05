import { getPool } from "../../database/getPool.js";
import { databaseQueryError } from "../../Services/error/errorDataBase.js";

export const selectOrderByIdModel = async (orderId) => {
  try {
    const pool = await getPool();

    const [result] = await pool.query(
      `SELECT * FROM Orders WHERE ID_order = ?`,
      [orderId]
    );

    return result[0];
  } catch (error) {
    databaseQueryError(
      error.message || "Error en el modelo al seleccionar la orden"
    );
  }
};
