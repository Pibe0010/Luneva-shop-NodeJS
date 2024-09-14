import { getPool } from "../../database/getPool.js";
import { databaseQueryError } from "../../Services/error/errorDataBase.js";

export const selectProductByTrolleyModel = async (customer) => {
  try {
    const pool = await getPool();

    const [result] = await pool.query(
      "SELECT * FROM Trolleys WHERE ID_customer = ?",
      [customer]
    );

    if (result.length === 0) {
      return null;
    }

    return result[0];
  } catch (error) {
    databaseQueryError(
      error.message || "Error en el modelo al obtener el carrito de un cliente"
    );
  }
};
