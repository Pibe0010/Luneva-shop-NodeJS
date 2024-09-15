import { getPool } from "../../database/getPool.js";
import { databaseQueryError } from "../../Services/error/errorDataBase.js";

export const selectCustomerByIdFromDeleteModel = async (ID_user) => {
  try {
    const pool = await getPool();

    const [result] = await pool.query(
      `SELECT * FROM Customers WHERE ID_customer = ?`,
      [ID_user]
    );

    if (result.length === 0) {
      return null;
    }

    return result[0];
  } catch (error) {
    databaseQueryError(
      error.message || "Error en el modelo al obtener el cliente por id"
    );
  }
};
