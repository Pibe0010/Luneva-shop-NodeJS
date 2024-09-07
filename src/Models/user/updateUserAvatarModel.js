import { getPool } from "../../database/getPool.js";
import { databaseUpdateError } from "../../Services/error/errorDataBase.js";

export const updateUserAvatarModel = async (ID_user, avatarName) => {
  try {
    const pool = await getPool();

    const [result] = await pool.query(
      `UPDATE Users SET avatar = ? WHERE ID_user = ?`,
      [avatarName, ID_user]
    );

    if (result.affectedRows === 0) {
      databaseUpdateError("No se ha podido actualizar el avatar");
    }

    return result;
  } catch (error) {
    databaseUpdateError(
      error.message || "Error en el modelo al actualizar el avatar del usuario"
    );
  }
};
