import { getPool } from "../../database/getPool.js";

export const selectUserByIdModel = async (ID_user) => {
  const pool = getPool();

  const [user] = await pool.query("SELECT * FROM Users WHERE ID_user = ?", [
    ID_user,
  ]);

  return user[0];
};
