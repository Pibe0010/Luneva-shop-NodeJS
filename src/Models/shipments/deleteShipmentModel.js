import { getPool } from "../../database/getPool.js";

export const deleteShipmentModel = async (order) => {
  const pool = getPool();

  const [result] = await pool.query(
    `DELETE FROM Shipments WHERE ID_order = ?`,
    [order]
  );

  if (result.affectedRows === 0) {
    const error = new Error("No se ha podido eliminar el envio.");
    error.code = "DELETE_SHIPMENT_ERROR";
    throw error;
  }

  return { message: "Producto eliminado correctamente" };
};
