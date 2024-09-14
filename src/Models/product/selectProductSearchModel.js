import { getPool } from "../../database/getPool.js";
import { databaseQueryError } from "../../Services/error/errorDataBase.js";

export const selectProductSearchModel = async (searchTerm) => {
  try {
    const pool = await getPool();

    const [rows] = await pool.query(
      `SELECT * FROM Products WHERE name LIKE? OR ref_PR LIKE?`,
      [`%${searchTerm}%`, `%${searchTerm}%`]
    );

    if (rows.length === 0) {
      return null;
    }

    return rows;
  } catch (error) {
    databaseQueryError(
      error.message ||
        "Error al obtener la lista de busquedas de productos desde el modelo"
    );
  }
};
