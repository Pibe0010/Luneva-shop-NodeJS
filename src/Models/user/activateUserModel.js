import { getPool } from "../../database/getPool.js";
import { databaseUpdateError } from "../../Services/error/errorDataBase.js";

export const activateUserModel = async (ID_user) => {
  try {
    const pool = await getPool();

    const query = `UPDATE Users SET active = 1 WHERE ID_user = ?`;

    const values = [ID_user];

    const [result] = await pool.query(query, values);

    if (result.affectedRows === 0) {
      databaseUpdateError();
    }

    return result;
  } catch (error) {
    databaseUpdateError(error.message || "Error en la activacion del usuario");
  }
};
