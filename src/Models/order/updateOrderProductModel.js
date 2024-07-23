import { getPool } from "../../database/getPool.js";

export const updateOrderProductModel = async (products_amount, ID_product) => {
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

  if (fieldsToUpdate.length === 0) return {};

  const query = `UPDATE Orders SET ${fieldsToUpdate.join(", ")} WHERE ID_product = ?`;
  values.push(ID_product);

  const [result] = await pool.query(query, values);

  // Si no se actualizo el producto lanzamos un error
  if (result.affectedRows === 0) {
    const error = new Error("No se ha podido actualizar el producto");
    error.httpStatus = 500;
    error.code = "UPDATE_ORDER_ERROR";
    throw error;
  }
};
