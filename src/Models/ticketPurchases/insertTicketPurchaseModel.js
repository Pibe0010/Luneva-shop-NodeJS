import { getPool } from "../../database/getPool.js";
import { databaseInsertError } from "../../Services/error/errorDataBase.js";

export const insertTicketPurchaseModel = async (ID_ticket, ID_payment) => {
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

    addToUpdate("ID_ticket", ID_ticket);
    addToUpdate("ID_payment", ID_payment);

    if (fieldsToUpdate.length === 0) return {}; // No hay campos para actualizar, salir

    const query = `INSERT INTO Ticket_purchases SET ${fieldsToUpdate.join(", ")} `;
    const [result] = await pool.query(query, values);

    if (result.affectedRows === 0) {
      databaseInsertError("No se ha podido insertar el ticket.");
    }
  } catch (error) {
    databaseInsertError(
      error.message ||
        "Error al insertar el ticket de compra en la base de datos."
    );
  }
};
