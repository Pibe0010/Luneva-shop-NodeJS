import { getPool } from "../../database/getPool.js";
import { databaseUpdateError } from "../../Services/error/errorDataBase.js";

export const updatePaymentModel = async (ID_payment, payment_method) => {
  try {
    const pool = await getPool();

    // Preparar los campos y valores para actualizar
    const fieldsToUpdate = [];
    const values = [];

    const addToUpdate = (field, value) => {
      if (value !== undefined && value !== null) {
        fieldsToUpdate.push(`${field} = ?`);
        values.push(value);
      }
    };

    addToUpdate("payment_method", payment_method);

    if (fieldsToUpdate.length === 0) return {}; // No hay campos para actualizar

    const query = `UPDATE Payments SET ${fieldsToUpdate.join(", ")} WHERE ID_payment = ?`;
    values.push(ID_payment);

    const [result] = await pool.query(query, values);

    if (result.affectedRows === 0) {
      databaseUpdateError("No se ha podido actualizar el pago");
    }
  } catch (error) {
    databaseUpdateError("Error en el modelo al actualizar el pago");
  }
};
