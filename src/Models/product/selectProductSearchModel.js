import { getPool } from "../../database/getPool.js";
import { databaseQueryError } from "../../Services/error/errorDataBase.js";

export const selectProductSearchModel = async (searchTerm) => {
  try {
    const pool = await getPool();

    const [result] = await pool.query(
      `SELECT * FROM Products WHERE name LIKE? OR ref_PR LIKE?`,
      [`%${searchTerm}%`, `%${searchTerm}%`]
    );

    if (result.length === 0) {
      return null;
    }

    return result;
  } catch (error) {
    databaseQueryError(
      error.message ||
        "Error al obtener la lista de busquedas de productos desde el modelo"
    );
  }
};
