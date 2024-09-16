import { getPool } from "../../database/getPool.js";
import { databaseQueryError } from "../../Services/error/errorDataBase.js";

export const selectOrderByProductModel = async (ID_product, ID_customer) => {
  try {
    const pool = await getPool();

    const [result] = await pool.query(
      `SELECT * FROM Orders WHERE ID_customer = ? AND ID_product = ?`,
      [ID_customer, ID_product]
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
