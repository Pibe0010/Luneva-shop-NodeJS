import { getPool } from "../../database/getPool.js";
import { databaseDeleteError } from "../../Services/error/errorDataBase.js";

export const deleteOrderModel = async (order) => {
  try {
    const pool = await getPool();

    const result = await pool.query("DELETE FROM Orders WHERE ID_order = ?", [
      order,
    ]);

    if (result.affectedRows === 0) {
      databaseDeleteError("No se ha podido eliminar la orden");
    }
  } catch (error) {
    databaseDeleteError(
      error.message || "Error en el modelo al eliminar una orden",
      "Error en el modelo al eliminar una orden"
    );
  }
};
