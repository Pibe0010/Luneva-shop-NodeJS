import { getPool } from "../../database/getPool.js";
import { databaseQueryError } from "../../Services/error/errorDataBase.js";

export const insertShipmentModel = async (
  ID_shipment,
  ref,
  ID_order,
  address
) => {
  try {
    const pool = await getPool();

    const [result] = await pool.query(
      `INSERT INTO Shipments (ID_shipment, ref_SH, ID_order, ID_shipping_address) VALUES (?,?,?,?)`,
      [ID_shipment, ref, ID_order, address]
    );

    if (result.affectedRows === 0) {
      databaseQueryError("No se ha podido eliminar la dirección.");
    }
  } catch (error) {
    databaseQueryError(
      error.message || "Error en el modelo al insertar el envio"
    );
  }
};
