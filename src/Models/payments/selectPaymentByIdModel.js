import { getPool } from "../../database/getPool.js";
import { databaseInsertError } from "../../Services/error/errorDataBase.js";

export const selectPaymentByIdModel = async (ID_payment) => {
  try {
    const pool = await getPool();

    const [result] = await pool.query(
      `SELECT * FROM Payments WHERE ID_payment = ?`,
      [ID_payment]
    );

    if (result.length === 0) return null;

    return result[0];
  } catch (error) {
    databaseInsertError(
      error.message ||
        "Error en el modelo al obtener el pago en la base de datos"
    );
  }
};
