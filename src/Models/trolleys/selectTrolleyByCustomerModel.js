import { getPool } from "../../database/getPool.js";
import { databaseQueryError } from "../../Services/error/errorDataBase.js";

export const selectTrolleyByCustomerModel = async (ID_customer) => {
  try {
    const pool = await getPool();

    const [result] = await pool.query(
      `SELECT * FROM Trolleys WHERE ID_customer = ? `,
      [ID_customer]
    );

    if (result.length === 0) {
      return null;
    }

    return result;
  } catch (error) {
    databaseQueryError(
      error.message || "Error en el modelo al obtener el carrito"
    );
  }
};
