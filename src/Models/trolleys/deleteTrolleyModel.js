import { getPool } from "../../database/getPool.js";

export const deleteTrolleyModel = async (trolley) => {
  const pool = getPool();

  // Borramos el carrito
  const [result] = await pool.query(
    `DELETE FROM Trolleys WHERE ID_trolley = ?`,
    [trolley]
  );

  if (result.affectedRows === 0) {
    const error = new Error("No se ha podido eliminar el producto.");
    error.code = "DELETE_PRODUCTS_ERROR";
    throw error;
  }

  return { message: "Carrito eliminado correctamente" };
};
