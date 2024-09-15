import { getPool } from "../../database/getPool.js";
import { databaseQueryError } from "../../Services/error/errorDataBase.js";

export const selectTrolleyByIdCustomerModel = async (
  ID_customer,
  ID_product
) => {
  try {
    const pool = await getPool();

    const [result] = await pool.query(
      `SELECT * FROM Trolleys WHERE ID_customer = ? AND ID_product = ?`,
      [ID_customer, ID_product]
    );

    if (result.length === 0) {
      return null;
    }

    return result[0];
  } catch (error) {
    databaseQueryError(
      error.message ||
        "Error en el modelo al obtener el carrito por id del cliente"
    );
  }
};
