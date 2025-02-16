import { getPool } from "../../database/getPool.js";
import { databaseInsertError } from "../../Services/error/errorDataBase.js";

export const changeTicketStatusModel = async (ID_ticket, status) => {
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

    addToUpdate("status", status);

    if (fieldsToUpdate.length === 0) return {}; // No hay campos para actualizar, salir

    const query = `UPDATE Ticket_purchases SET ${fieldsToUpdate.join(", ")} WHERE ID_ticket = ?`;
    values.push(ID_ticket);
    const [result] = await pool.query(query, values);

    if (result.affectedRows === 0) {
      databaseInsertError("No se ha podido cambiar el estado del ticket.");
    }
  } catch (error) {
    databaseInsertError(
      error.message ||
        "Error al cambiar el estado del ticket de compra en la base de datos."
    );
  }
};
