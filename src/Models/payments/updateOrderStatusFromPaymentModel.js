import { getPool } from "../../database/getPool.js";
import { databaseInsertError } from "../../Services/error/errorDataBase.js";

export const updateOrderStatusFromPaymentModel = async (ID_order, sent) => {
  try {
    const pool = getPool();

    const fieldsToUpdate = [];
    const values = [];

    const addToUpdate = (field, value) => {
      if (value !== undefined && value !== null) {
        fieldsToUpdate.push(`${field} = ?`);
        values.push(value);
      }
    };

    addToUpdate("status", sent);

    if (fieldsToUpdate.length === 0) return {};

    const query = `UPDATE Orders SET ${fieldsToUpdate.join(", ")} WHERE ID_order = ?`;
    values.push(ID_order);

    const [result] = await pool.query(query, values);

    // Si no se actualizo el producto lanzamos un error
    if (result.affectedRows === 0) {
      databaseInsertError("No se ha podido actualizar la orden");
    }
  } catch (error) {
    databaseInsertError(
      error.message || "Error en el modelo al cambiar el estado de la orden"
    );
  }
};
