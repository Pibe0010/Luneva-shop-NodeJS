import { getPool } from "../../database/getPool.js";
import { databaseUpdateError } from "../../Services/error/errorDataBase.js";

export const updatePasswordModel = async (ID_user, hashedPassword) => {
  try {
    const pool = await getPool();

    const query = `UPDATE Users SET password = ? WHERE ID_user = ?`;

    const [result] = await pool.execute(query, [hashedPassword, ID_user]);

    if (result.affectedRows === 0) {
      databaseUpdateError("No se ha podido actualizar la contraseña.");
    }

    return { message: "Contraseña actualizada correctamente" };
  } catch (error) {
    databaseUpdateError(
      error.message || "Error en el modelo al actualizar la contraseña"
    );
  }
};
