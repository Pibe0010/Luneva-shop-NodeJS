import { getPool } from "../../database/getPool.js";
import { databaseDeleteError } from "../../Services/error/errorDataBase.js";

export const deleteUserModel = async (ID_user) => {
  try {
    const pool = await getPool();

    await pool.query(`DELETE FROM Customers WHERE ID_user = ?`, [ID_user]);

    const [result] = await pool.query(`DELETE FROM Users WHERE ID_user = ?`, [
      ID_user,
    ]);

    if (result.length === 1) {
      databaseDeleteError("No se ha podido eliminar el usuario");
    }
  } catch (error) {
    databaseDeleteError(
      error.message || "Error en el modelo al eliminiar un usuario",
      "Error en el modelo al eliminiar un usuario"
    );
  }
};
