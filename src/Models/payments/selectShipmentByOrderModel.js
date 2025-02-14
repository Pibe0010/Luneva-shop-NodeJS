import { getPool } from "../../database/getPool.js";
import { databaseQueryError } from "../../Services/error/errorDataBase.js";

export const selectShipmentByOrdersModel = async (ID_order) => {
  try {
    const pool = await getPool();

    const [result] = await pool.query(
      `SELECT ID_shipment, status FROM Shipments WHERE ID_order = ?`,
      [ID_order]
    );

    if (result.length === 0) {
      return null;
    }

    return result;
  } catch (error) {
    databaseQueryError(
      "Error en el modelo al obtener la orden de pago de un cliente"
    );
  }
};
