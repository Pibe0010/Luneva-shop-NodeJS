import { getPool } from "../../database/getPool.js";
import { databaseUpdateError } from "../../Services/error/errorDataBase.js";

export const toggleActiveOfferModel = async (ID_offer, active) => {
  try {
    const pool = getPool();

    const query = `UPDATE Offers SET active = ? WHERE ID_offer = ?`;

    const [result] = await pool.query(query, [active, ID_offer]);

    if (result.affectedRows === 0) {
      const error = new Error(
        "No se ha podido actualizar el estado de la oferta"
      );
      error.httpStatus = 500;
      error.code = "UPDATE_OFFERT_ERROR";
      throw error;
    }
  } catch (error) {
    databaseUpdateError(
      error.message || "Error en el modelo al cambiar el estado de la oferta"
    );
  }
};
