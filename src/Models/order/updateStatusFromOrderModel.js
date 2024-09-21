import { getPool } from "../../database/getPool.js";
import { databaseUpdateError } from "../../Services/error/errorDataBase.js";

export const updateStatusFromOrderModel = async (ID_order, status) => {
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

    const query = `UPDATE Orders SET ${fieldsToUpdate.join(", ")} WHERE ID_order = ?`;
    values.push(ID_order);

    const [result] = await pool.query(query, values);

    if (result.affectedRows === 0) {
      databaseUpdateError("No se ha podido actualizar el estado de la orden");
    }
  } catch (error) {
    databaseUpdateError(
      "Error al actualizar el estado de la orden en el modelo"
    );
  }
};
