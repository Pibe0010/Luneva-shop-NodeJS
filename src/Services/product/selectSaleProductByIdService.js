import { getPool } from "../../database/getPool.js";

export const selectSaleProductByIdService = async (productId) => {
  const pool = await getPool();

  const [result] = await pool.query(
    `SELECT * FROM Products WHERE ID_product = ?`,
    [productId]
  );

  return result[0];
};
