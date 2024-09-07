import { getPool } from "../../database/getPool.js";
import { databaseDeleteError } from "../../Services/error/errorDataBase.js";

export const deleteTrolleyModel = async (trolley) => {
  try {
    const pool = getPool();

    // Borramos el carrito
    const [result] = await pool.query(
      `DELETE FROM Trolleys WHERE ID_trolley = ?`,
      [trolley]
    );

    if (result.lenght === 1) {
      databaseDeleteError("No se ha podido eliminar el carrito.");
    }

    return { message: "Carrito eliminado correctamente" };
  } catch (error) {
    databaseDeleteError(
      error.message || "Error en el modelo al eliminar el carrito",
      "Error en el modelo al eliminar el carrito"
    );
  }
};
