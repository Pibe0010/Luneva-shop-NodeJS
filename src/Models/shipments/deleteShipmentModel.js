import { getPool } from "../../database/getPool.js";
import { databaseDeleteError } from "../../Services/error/errorDataBase.js";

export const deleteShipmentModel = async (ID_shipment) => {
  try {
    const pool = getPool();

    const [result] = await pool.query(
      `DELETE FROM Shipments WHERE ID_shipment = ?`,
      [ID_shipment]
    );

    if (result.affectedRows === 0) {
      databaseDeleteError("No se ha podido eliminar el envio.");
    }
  } catch (error) {
    databaseDeleteError(
      error.message || "Error en el modelo al eliminiar el envio"
    );
  }
};
