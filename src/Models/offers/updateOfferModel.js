import { getPool } from "../../database/getPool.js";

export const updateOfferModel = async (
  offer,
  discount_rate,
  start_date,
  ending_date
) => {
  const pool = await getPool();

  const fieldsToUpdate = [];
  const values = [];

  const addToUpdate = (field, value) => {
    if (value !== undefined && value !== null) {
      fieldsToUpdate.push(`${field} = ?`);
      values.push(value);
    }
  };

  addToUpdate(`discount_rate`, discount_rate);
  addToUpdate(`start_date`, start_date);
  addToUpdate(`ending_date`, ending_date);

  if (fieldsToUpdate.length === 0) return {};

  const query = `UPDATE Offers SET ${fieldsToUpdate.join(", ")} WHERE ID_offer = ?`;
  values.push(offer);

  const [result] = await pool.query(query, values);

  // Si no se ha actualizado ningún producto, lanzar un error.
  if (result.affectedRows === 0) {
    const error = new Error("No se ha podido actualizar el producto");
    error.httpStatus = 500;
    error.code = "UPDATE_PRODUCT_ERROR";
    throw error;
  }

  // Devolver el resultado.
  return result;
};
