import { getPool } from "../../database/getPool.js";
import { databaseInsertError } from "../../Services/error/errorDataBase.js";

export const updateOrderModel = async (newProductsAmount, ID_order, price) => {
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

    addToUpdate("product_amount", newProductsAmount);
    addToUpdate("price", price);

    if (fieldsToUpdate.length === 0) return {};

    const query = `UPDATE Orders SET ${fieldsToUpdate.join(", ")} WHERE ID_order = ?`;
    values.push(ID_order);

    const [result] = await pool.query(query, values);

    if (result.affectedRows === 0) {
      databaseInsertError("No se ha podido actualizar la orden");
    }
  } catch (error) {
    databaseInsertError(
      error.message || "Error en el modelo al actualizar la orden"
    );
  }
};
