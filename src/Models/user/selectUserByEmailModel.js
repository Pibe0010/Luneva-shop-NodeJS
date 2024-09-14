import { getPool } from "../../database/getPool.js";
import { databaseQueryError } from "../../Services/error/errorDataBase.js";

export const selectUserByEmailModel = async (email) => {
  try {
    const pool = await getPool();

    const [user] = await pool.query("SELECT * FROM Users WHERE email = ?", [
      email,
    ]);

    if (user.length === 0) {
      return null;
    }

    return user[0];
  } catch (error) {
    databaseQueryError(
      error.message || "Error en el modelo al seleccionar usuario por email"
    );
  }
};
