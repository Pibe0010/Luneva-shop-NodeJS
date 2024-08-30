import { getPool } from "../../database/getPool.js";
import { databaseDeleteError } from "../../Services/error/errorDataBase.js";

export const deleteOfferModel = async (ID_offer) => {
  try {
    const pool = await getPool();

    const [result] = await pool.query(`DELETE FROM offers WHERE ID_offer = ?`, [
      ID_offer,
    ]);

    if (result.affectedRows === 0) {
      databaseDeleteError("No se ha podido eliminar el producto.");
    }

    return { message: "Oferta eliminado correctamente" };
  } catch (error) {
    databaseDeleteError(
      error.message || "Error en el modelo al eliminar una oferta",
      "Error en el modelo al eliminar una oferta"
    );
  }
};
