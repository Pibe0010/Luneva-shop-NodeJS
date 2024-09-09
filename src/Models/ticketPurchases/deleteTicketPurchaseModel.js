import { getPool } from "../../database/getPool.js";
import { databaseDeleteError } from "../../Services/error/errorDataBase.js";

export const deleteTicketPurchaseModel = async (ID_ticket) => {
  try {
    const pool = await getPool();

    const [result] = await pool.query(
      "DELETE FROM Ticket_purchases WHERE ID_ticket = ?",
      [ID_ticket]
    );

    if (result.affectedRows === 0) {
      databaseDeleteError("No se ha podido eliminar el ticket");
    }
  } catch (error) {
    databaseDeleteError(
      error.message || "Error desde el modelo al eliminar el ticket de compra",
      "Error desde el modelo al eliminar el ticket de compra"
    );
  }
};
