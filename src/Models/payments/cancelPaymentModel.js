import { getPool } from "../../database/getPool.js";
import { databaseInsertError } from "../../Services/error/errorDataBase.js";

export const cancelPaymentModel = async (ID_payment, status) => {
  try {
    const pool = await getPool();

    // Actualizar el pago
    const [result] = await pool.query(
      `UPDATE Payments SET status = ? WHERE ID_payment = ?`,
      [status, ID_payment]
    );

    if (result.affectedRows === 0) {
      databaseInsertError("No se ha podido actualizar el pago.");
    }
  } catch (error) {
    databaseInsertError(
      error.message ||
        "Error en el modelo al cambiar el estado del pago en la base de datos"
    );
  }
};
