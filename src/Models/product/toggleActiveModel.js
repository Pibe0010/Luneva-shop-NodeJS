import { getPool } from "../../database/getPool.js";

export const toggleActiveModel = async (ID_product, newStatus) => {
  const pool = getPool();

  const query = `UPDATE Products SET active = ? WHERE ID_product = ?`;

  const [result] = await pool.query(query, [newStatus, ID_product]);

  if (result.affectedRows === 0) {
    const error = new Error(
      "No se ha podido actualizar el estado del producto"
    );
    error.httpStatus = 500;
    error.code = "UPDATE_PRODUCT_ERROR";
    throw error;
  }
};
