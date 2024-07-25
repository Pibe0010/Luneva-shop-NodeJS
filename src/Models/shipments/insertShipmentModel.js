import { getPool } from "../../database/getPool.js";

export const insertShipmentModel = async (
  ID_shipment,
  ref,
  ID_order,
  address
) => {
  const pool = getPool();

  const [result] = await pool.query(
    `INSERT INTO Shipments (ID_shipment, ref_SH, ID_order, ID_shipping_address) VALUES (?,?,?,?)`,
    [ID_shipment, ref, ID_order, address]
  );

  if (result.affectedRows === 0) {
    const error = new Error("No se ha podido eliminar la dirección.");
    error.code = "DELETE_ADDRESS_ERROR";
    throw error;
  }
};
