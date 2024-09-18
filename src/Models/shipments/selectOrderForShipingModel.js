import { getPool } from "../../database/getPool.js";
import { databaseQueryError } from "../../Services/error/errorDataBase.js";

export const selectOrderForShipingModel = async (ID_customer) => {
  try {
    const pool = await getPool();

    const [result] = await pool.query(
      `SELECT * FROM Orders WHERE ID_customer = ? AND status = "earring"`,
      [ID_customer]
    );

    if (result.length === 0) {
      return null;
    }

    return result;
  } catch (error) {
    databaseQueryError(
      error.message || "Error en el modelo al obtener la orden para el envio"
    );
  }
};
