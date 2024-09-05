import { getPool } from "../../database/getPool.js";
import { databaseInsertError } from "../../Services/error/errorDataBase.js";

export const updateOrderModel = async (products_amount, order, price) => {
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

    addToUpdate("product_amount", products_amount);
    addToUpdate("price", price);

    if (fieldsToUpdate.length === 0) return {};

    const query = `UPDATE Orders SET ${fieldsToUpdate.join(", ")} WHERE ID_order = ?`;
    values.push(order);

    const [result] = await pool.query(query, values);

    // Si no se actualizo el producto lanzamos un error
    if (result.affectedRows === 0) {
      databaseInsertError("No se ha podido actualizar el producto");
    }
  } catch (error) {
    databaseInsertError(
      error.message || "Error en el modelo al actualizar la orden"
    );
  }
};
