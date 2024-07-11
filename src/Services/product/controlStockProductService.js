import { getPool } from "../../database/getPool.js";

export const controlStockProductService = async (productId) => {
  const pool = await getPool();

  const [result] = await pool.query(
    `SELECT name, stock  FROM Products WHERE ID_product = ?`,
    [productId]
  );

  return result[0];
};
