import { getPool } from "../../database/getPool.js";
import { databaseQueryError } from "../../Services/error/errorDataBase.js";

export const selectAddressFromShipmentModel = async (ID_customer) => {
  try {
    const pool = await getPool();

    const [result] = await pool.query(
      `SELECT * FROM Shipping_addresses WHERE ID_customer = ? `,
      [ID_customer]
    );

    if (result.length === 0) {
      return null;
    }

    return result[0];
  } catch (error) {
    databaseQueryError(
      error.message || "Error en el modelo al obtener la dirección de envio"
    );
  }
};
