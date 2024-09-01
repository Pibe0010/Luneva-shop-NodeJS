import { getPool } from "../../database/getPool.js";
import { databaseQueryError } from "../../Services/error/errorDataBase.js";

export const selectProductListModel = async () => {
  try {
    const pool = getPool();

    // Obrengo la lista
    const result = await pool.query(`SELECT * FROM Products`);

    return result[0];
  } catch (error) {
    databaseQueryError(
      error.message || "Error al obtener la lista de productos desde el modelo"
    );
  }
};
