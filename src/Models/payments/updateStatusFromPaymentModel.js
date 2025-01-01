import { getPool } from "../../database/getPool.js";
import { databaseUpdateError } from "../../Services/error/errorDataBase.js";

export const updateStatusFromPaymentModel = async (ID_payment, status) => {
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

    if (fieldsToUpdate.length === 0) return {};

    const query = `UPDATE Payments SET ${fieldsToUpdate.join(", ")} WHERE ID_payment = ?`;
    values.push(ID_payment);

    const [result] = await pool.query(query, values);

    if (result.affectedRows === 0) {
      databaseUpdateError("No se ha podido actualizar el estado de el pagon");
    }
  } catch (error) {
    databaseUpdateError(
      "Error al actualizar el estado de el pago en el modelo"
    );
  }
};
