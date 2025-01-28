import { getPool } from "../../database/getPool.js";
import { databaseQueryError } from "../../Services/error/errorDataBase.js";

export const selectOrderByProductModel = async (ID_product, ID_order) => {
  try {
    const pool = await getPool();

    const [result] = await pool.query(
      `SELECT * FROM Orders WHERE ID_order = ? AND ID_product = ?`,
      [ID_order, ID_product]
    );

    if (result.length === 0) {
      return null;
    }

    return result[0];
  } catch (error) {
    databaseQueryError(
      error.message ||
        "Error en el modelo al obtener la orden de envío por el producto"
    );
  }
};
