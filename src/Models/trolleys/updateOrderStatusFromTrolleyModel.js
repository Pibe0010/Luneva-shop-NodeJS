import { getPool } from "../../database/getPool.js";
import { databaseQueryError } from "../../Services/error/errorDataBase.js";

export const updateOrderStatusFromTrolleyModel = async (order, status) => {
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

    addToUpdate("status", status);

    if (fieldsToUpdate.length === 0) return {}; // No hay campos para actualizar

    const query = `UPDATE Orders SET ${fieldsToUpdate.join(", ")} WHERE ID_order = ?`;
    values.push(order);

    const [result] = await pool.query(query, values);

    if (result.affectedRows === 0) {
      databaseQueryError("No se ha podido actualizar el estado de la orden.");
    }
  } catch (error) {
    databaseQueryError(
      error.message || "Error en el modelo al actualizar el estado de la orden."
    );
  }
};
