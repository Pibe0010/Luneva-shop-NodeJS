import { getPool } from "../../database/getPool.js";
import { databaseQueryError } from "../../Services/error/errorDataBase.js";

export const getUserListModel = async () => {
  try {
    const pool = await getPool();

    const result = await pool.query(
      `SELECT Users.id_user, Users.user_name, Users.last_name, Users.email, Users.avatar
      FROM Users`
    );

    if (result.length === 0) {
      return null;
    }

    return result[0];
  } catch (error) {
    databaseQueryError(
      error.message || "Error al obtener la lista de usuarios desde el modelo"
    );
  }
};
