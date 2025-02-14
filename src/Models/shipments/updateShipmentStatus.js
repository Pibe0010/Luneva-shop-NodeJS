import { getPool } from "../../database/getPool.js";
import { databaseInsertError } from "../../Services/error/errorDataBase.js";

export const updateShipmentStatusModel = async (ID_shipment, status) => {
  try {
    const pool = await getPool();

    const query = `UPDATE Shipments SET status = ? WHERE ID_shipment = ?`;
    const values = [status, ID_shipment];

    const [result] = await pool.query(query, values);

    // Si no se ha actualizado ningún envío, lanzar un error.
    if (result.affectedRows === 0) {
      databaseInsertError("No se ha podido actualizar el envío");
    }
  } catch (error) {
    databaseInsertError(
      error.message || "Error en el modelo al actualizar el envio "
    );
  }
};
