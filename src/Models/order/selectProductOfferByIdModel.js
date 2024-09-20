import { getPool } from "../../database/getPool.js";
import { databaseQueryError } from "../../Services/error/errorDataBase.js";

export const selectProductOfferByIdModel = async (ID_product) => {
  try {
    const pool = await getPool();

    const [result] = await pool.query(
      `SELECT * FROM Offers WHERE ID_product = ?`,
      [ID_product]
    );

    if (result.length === 0) {
      return null;
    }

    return result[0];
  } catch (error) {
    databaseQueryError(
      error.message ||
        "Error en el modelo al obtener la oferta del un producto en la orden"
    );
  }
};
