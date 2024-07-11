import { getPool } from "../../database/getPool.js";

export const selectUserByEmailModel = async (email) => {
  const pool = getPool();

  const [user] = await pool.query("SELECT * FROM Users WHERE email = ?", [
    email,
  ]);

  return user[0];
};
