import { getPool } from "../../database/getPool.js";
import { databaseDeleteError } from "../../Services/error/errorDataBase.js";

export const deleteAllTrolleyModel = async (ID_trolley) => {
  try {
    const pool = await getPool();

    // Borramos el carrito
    const [result] = await pool.query(
      `DELETE FROM Trolleys WHERE ID_trolley = ?`,
      [ID_trolley]
    );

    if (result.lenght === 1) {
      databaseDeleteError("No se ha podido eliminar el carrito.");
    }
  } catch (error) {
    databaseDeleteError(
      error.message || "Error en el modelo al eliminar el carrito",
      "Error en el modelo al eliminar el carrito"
    );
  }
};
