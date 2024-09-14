import { getPool } from "../../database/getPool.js";
import { databaseDeleteError } from "../../Services/error/errorDataBase.js";

export const deletePaymentModel = async (ID_payment) => {
  try {
    const pool = await getPool();

    const [result] = await pool.query(
      "DELETE FROM Payments WHERE ID_payment = ? ",
      [ID_payment]
    );

    if (result.affectedRows === 0) {
      databaseDeleteError("No se ha podido eliminar el pago");
    }
  } catch (error) {
    databaseDeleteError(
      error.message || "Error en el modelo al eliminar el pago",
      "Error en el modelo al eliminar el pago"
    );
  }
};
