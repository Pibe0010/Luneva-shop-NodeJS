import { getPool } from "../../database/getPool.js";

export const deleteOfferModel = async (ID_offer) => {
  const pool = await getPool();

  const [result] = await pool.query(`DELETE FROM offers WHERE ID_offer = ?`, [
    ID_offer,
  ]);

  if (result.affectedRows === 0) {
    const error = new Error("No se ha podido eliminar el producto.");
    error.code = "DELETE_OFFERT_ERROR";
    throw error;
  }

  return { message: "Oferta eliminado correctamente" };
};
