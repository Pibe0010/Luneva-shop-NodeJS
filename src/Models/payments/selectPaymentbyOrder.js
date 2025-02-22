import { getPool } from "../../database/getPool.js";
import { databaseQueryError } from "../../Services/error/errorDataBase.js";

export const selectPaymentByOrdersModel = async (ID_order) => {
  try {
    const pool = await getPool();

    const [result] = await pool.query(
      `SELECT ID_payment, status FROM Payments WHERE ID_order = ? AND status = "pending"`,
      [ID_order]
    );

    if (result.length === 0) {
      return null;
    }

    return result;
  } catch (error) {
    databaseQueryError(
      "Error en el modelo al obtener la orden de pago de un cliente"
    );
  }
};
