import { getPool } from "../../database/getPool.js";

export const selectCustomerByIdModel = async (ID_user) => {
  const pool = await getPool();

  const [result] = await pool.query(
    `SELECT * FROM Customers WHERE ID_user = ?`,
    [ID_user]
  );

  return result[0];
};
