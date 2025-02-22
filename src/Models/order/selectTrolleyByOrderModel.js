import { getPool } from "../../database/getPool.js";
import { databaseQueryError } from "../../Services/error/errorDataBase.js";

export const selectTrolleyByOrderModel = async (ID_order) => {
  try {
    const pool = await getPool();

    const [result] = await pool.query(
      `SELECT * FROM Orders WHERE ID_order = ?`,
      [ID_order]
    );

    if (result.length === 0) {
      return null;
    }

    return result;
  } catch (error) {
    databaseQueryError(
      error.message ||
        "Error en el modelo al obtener el carrito en la orden de envio"
    );
  }
};
