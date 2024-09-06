import { getPool } from "../../database/getPool.js";
import { databaseQueryError } from "../../Services/error/errorDataBase.js";

export const selectProductByTrolleyModel = async (customer) => {
  try {
    const pool = await getPool();

    const [rows] = await pool.query(
      "SELECT * FROM Trolleys WHERE ID_customer = ?",
      [customer]
    );

    return rows[0];
  } catch (error) {
    databaseQueryError(
      error.message || "Error en el modelo al obtener el carrito de un cliente"
    );
  }
};
