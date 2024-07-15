import { getPool } from "../../database/getPool.js";

export const updateCustomerPhoneModel = async (ID_user, phone) => {
  const pool = getPool();

  const fieldsToUpdate = [];
  const values = [];

  const addToUpdate = (field, value) => {
    if (value !== undefined && value !== null) {
      fieldsToUpdate.push(`${field} = ?`);
      values.push(value);
    }
  };

  addToUpdate("phone", phone);

  if (fieldsToUpdate.length === 0) return {};

  //insetamos en la base de datos
  const query = `UPDATE Customers SET ${fieldsToUpdate.join(", ")} WHERE ID_user = ?`;
  values.push(ID_user);

  const [result] = await pool.query(query, values);

  if (result.affectedRows === 0) {
    const error = new Error("No se ha podido actualizar el Cliente.");
    error.httpStatus = 500;
    error.code = "UPDATE_CUSTOMER_ERROR";
    throw error;
  }

  return result;
};
