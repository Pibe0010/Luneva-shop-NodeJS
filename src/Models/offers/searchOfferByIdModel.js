import { getPool } from "../../database/getPool.js";
import { databaseQueryError } from "../../Services/error/errorDataBase.js";

export const searchOfferByIdModel = async (ID_offer) => {
  try {
    const pool = await getPool();

    const [offer] = await pool.query(
      "SELECT * FROM Offers WHERE ID_offer = ?",
      [ID_offer]
    );

    if (offer.length === 0) {
      return null;
    }

    return offer[0];
  } catch (error) {
    databaseQueryError(
      error.message || "Error en el modelo al obtener una oferta"
    );
  }
};
