import { getPool } from "../../database/getPool.js";
import { databaseDeleteError } from "../../Services/error/errorDataBase.js";

export const deletePaymentCancelModel = async (
  ID_order,
  status,
  ID_payment
) => {
  try {
    console.log(ID_payment);
    const pool = await getPool();

    await pool.query(`DELETE FROM Ticket_purchases WHERE ID_payment = ?`, [
      ID_payment,
    ]);

    await pool.query(`DELETE FROM Payments WHERE ID_order = ?`, [ID_order]);

    await pool.query(`DELETE FROM Shipments WHERE ID_order = ?`, [ID_order]);

    await pool.query(`UPDATE Orders SET status = ? WHERE ID_order = ?`, [
      status,
      ID_order,
    ]);
  } catch (error) {
    databaseDeleteError(
      error.message || "Error en el modelo al eliminiar el pago cancelado"
    );
  }
};
