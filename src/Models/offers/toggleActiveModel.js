import { getPool } from "../../database/getPool.js";
import { databaseUpdateError } from "../../Services/error/errorDataBase.js";

export const toggleActiveOfferModel = async (ID_offer, active) => {
  try {
    const pool = await getPool();

    const query = `UPDATE Offers SET active = ? WHERE ID_offer = ?`;

    const [result] = await pool.query(query, [active, ID_offer]);

    if (result.affectedRows === 0) {
      databaseUpdateError("No se ha podido actualizar el estado de la oferta");
    }
  } catch (error) {
    databaseUpdateError("Error en el modelo al cambiar el estado de la oferta");
  }
};
