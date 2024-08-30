import { getPool } from "../../database/getPool.js";
import { databaseQueryError } from "../../Services/error/errorDataBase.js";

export const searchOfferByIdModel = async (ID_product) => {
  try {
    const pool = getPool();

    const [offer] = await pool.query(
      "SELECT * FROM Offers WHERE ID_product = ?",
      [ID_product]
    );

    return offer[0];
  } catch (error) {
    databaseQueryError(
      error.message || "Error en el modelo al obtener una oferta por id"
    );
  }
};
