import { getPool } from "../../database/getPool.js";
import { databaseInsertError } from "../../Services/error/errorDataBase.js";

export const insertOfferModel = async (
  ID_offer,
  ID_product,
  discount_rate,
  start_date,
  ending_date
) => {
  try {
    const pool = getPool();

    const [result] = await pool.query(
      `INSERT INTO Offers (ID_offer, ID_product, discount_rate, start_date, ending_date) VALUES (?, ?, ?, ?, ?)`,
      [ID_offer, ID_product, discount_rate, start_date, ending_date]
    );

    if (result.affectedRows === 0) {
      databaseInsertError("No se ha podido insertar el producto.");
    }
  } catch (error) {
    databaseInsertError(
      error.message || "Error en el modelo al insertar una oferta"
    );
  }
};
