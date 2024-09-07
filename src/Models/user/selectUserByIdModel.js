import { getPool } from "../../database/getPool.js";
import { databaseQueryError } from "../../Services/error/errorDataBase.js";

export const selectUserByIdModel = async (ID_user) => {
  try {
    const pool = getPool();

    const [user] = await pool.query("SELECT * FROM Users WHERE ID_user = ?", [
      ID_user,
    ]);

    return user[0];
  } catch (error) {
    databaseQueryError(
      error.message || "Error al obtener el usuario en el modelo"
    );
  }
};
