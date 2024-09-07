import { getPool } from "../../database/getPool.js";
import { databaseQueryError } from "../../Services/error/errorDataBase.js";

export const selectShippingAdrressModel = async (address) => {
  try {
    const pool = getPool();

    const [result] = await pool.query(
      `SELECT ID_address, address, street_number, floor, ladder_door, postal_code, city, country FROM Shipping_addresses WHERE ID_address = ?`,
      [address]
    );

    return result[0];
  } catch (error) {
    databaseQueryError(
      error.message || "Error al obtener la dirección desde el modelo"
    );
  }
};
