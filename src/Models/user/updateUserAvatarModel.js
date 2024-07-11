import { getPool } from "../../database/getPool.js";

export const updateUserAvatarModel = async (ID_user, avatarName) => {
  const pool = await getPool();

  const [result] = await pool.query(
    `UPDATE Users SET avatar = ? WHERE ID_user = ?`,
    [avatarName, ID_user]
  );

  if (result.affectedRows === 0) {
    const error = new Error("No se ha podido actualizar el avatar");
    error.httpStatus = 500;
    error.code = "UPDATE_USER_AVATAR_ERROR";
    throw error;
  }

  return result;
};
