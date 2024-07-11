import { getPool } from "../../database/getPool.js";

export const deleteUserModel = async (ID_user) => {
  const pool = await getPool();
  const [result] = await pool.query(`DELETE FROM Users WHERE id_user = ?`, [
    ID_user,
  ]);

  if (result.affectedRows === 0) {
    const error = new Error("No se ha podido eliminar el usuario");
    error.code = "DELETE_USER_ERROR";
    throw error;
  }
};
