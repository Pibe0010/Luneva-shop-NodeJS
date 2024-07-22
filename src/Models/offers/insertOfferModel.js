import { getPool } from "../../database/getPool.js";

export const insertOfferModel = async (
  ID_offer,
  ID_product,
  discount_rate,
  start_date,
  ending_date
) => {
  const pool = getPool();

  const [result] = await pool.query(
    `INSERT INTO Offers (ID_offer, ID_product, discount_rate, start_date, ending_date) VALUES (?, ?, ?, ?, ?)`,
    [ID_offer, ID_product, discount_rate, start_date, ending_date]
  );

  if (result.affectedRows === 0) {
    const error = new Error("No se ha podido insertar el producto.");
    error.code = "INSERT_PRODUCTS_ERROR";
    throw error;
  }
};
