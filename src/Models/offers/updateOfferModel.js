import { getPool } from "../../database/getPool.js";
import { databaseInsertError } from "../../Services/error/errorDataBase.js";

export const updateOfferModel = async (
  offer,
  discount_rate,
  start_date,
  ending_date
) => {
  try {
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

    if (result.affectedRows === 0) {
      databaseInsertError("No se ha podido actualizar la ofeta");
    }

    // Devolver el resultado.
    return result;
  } catch (error) {
    databaseInsertError("Error en el modelo al actualizar la oferta");
  }
};
