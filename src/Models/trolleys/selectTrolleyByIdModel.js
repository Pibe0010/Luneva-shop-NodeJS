import { getPool } from "../../database/getPool.js";

export const selectTrolleyByIdModel = async (customer_id) => {
  const pool = await getPool();

  const [result] = await pool.query(
    `SELECT * FROM Trolleys WHERE ID_customer = ?`,
    [customer_id]
  );

  return result[0];
};
