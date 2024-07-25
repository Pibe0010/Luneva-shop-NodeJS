import { getPool } from "../../database/getPool.js";

export const selectOrderByIdModel = async (ID_product) => {
  const pool = await getPool();

  const [result] = await pool.query(
    `SELECT * FROM Orders WHERE ID_product = ?`,
    [ID_product]
  );

  return result[0];
};
