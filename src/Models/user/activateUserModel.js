import { getPool } from "../../database/getPool.js";

export const activateUserModel = async (ID_user) => {
  const pool = getPool();

  const query = `UPDATE Users SET active = 1 WHERE ID_user = ?`;

  const values = [ID_user];

  const [result] = await pool.query(query, values);
  return result;
};
