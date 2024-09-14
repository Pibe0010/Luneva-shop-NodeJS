import { getPool } from "../../database/getPool.js";
import {
  databaseQueryError,
  databaseUpdateError,
} from "../../Services/error/errorDataBase.js";

export const updateTrolleyStatusModel = async (ID_trolley, process) => {
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

    addToUpdate("process", process);

    if (fieldsToUpdate.length === 0) return {}; // No hay campos para actualizar

    const query = `UPDATE Trolleys SET ${fieldsToUpdate.join(", ")} WHERE ID_trolley = ?`;
    values.push(ID_trolley);

    const [result] = await pool.query(query, values);

    if (result.affectedRows === 0) {
      databaseUpdateError(
        "No se ha podido actualizar el estado de el carrito "
      );
    }
  } catch (error) {
    databaseQueryError(
      error.message || "Error en el modelo al actualizar el estado del carrito"
    );
  }
};
