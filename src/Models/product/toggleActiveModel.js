import { getPool } from "../../database/getPool.js";
import { databaseUpdateError } from "../../Services/error/errorDataBase.js";

export const toggleActiveModel = async (ID_product, newStatus) => {
  try {
    const pool = getPool();

    const query = `UPDATE Products SET active = ? WHERE ID_product = ?`;

    const [result] = await pool.query(query, [newStatus, ID_product]);

    if (result.affectedRows === 0) {
      databaseUpdateError("No se ha podido actualizar el estado del producto");
    }
  } catch (error) {
    databaseUpdateError(
      error.message || "Error en el modelo al cambiar el estado del producto"
    );
  }
};
