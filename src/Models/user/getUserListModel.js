import { getPool } from "../../database/getPool.js";

export const getUserListModel = async () => {
  const pool = getPool();

  const result = await pool.query(
    `SELECT Users.id_user, Users.user_name, Users.last_name, Users.email, Users.avatar
    FROM Users`
  );

  return result[0];
};
