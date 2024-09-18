import { getPool } from "../../database/getPool.js";
import { databaseQueryError } from "../../Services/error/errorDataBase.js";

export const selectShippingAddressByIdModel = async (ID_address) => {
  try {
    const pool = await getPool();

    const [result] = await pool.query(
      `SELECT ID_address, address, street_number, floor, ladder_door, postal_code, city, country FROM Shipping_addresses WHERE ID_address = ?`,
      [ID_address]
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
