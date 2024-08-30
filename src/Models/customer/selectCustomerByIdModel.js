import { getPool } from "../../database/getPool.js";
import { databaseQueryError } from "../../Services/error/errorDataBase.js";

export const selectCustomerByIdModel = async (ID_user) => {
  try {
    const pool = await getPool();

    const [result] = await pool.query(
      `SELECT * FROM Customers WHERE ID_user = ?`,
      [ID_user]
    );

    return result[0];
  } catch (error) {
    databaseQueryError(
      error.message || "Error en el modelo al obtener el cliente por id"
    );
  }
};
