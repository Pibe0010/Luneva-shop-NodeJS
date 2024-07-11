import { getPool } from "../../database/getPool.js";

export const updateUserModel = async (
  userId,
  user_name,
  last_name,
  email,
  role
) => {
  const pool = await getPool();

  const fieldsToUpdate = [];
  const values = [];

  const addToUpdate = (field, value) => {
    if (value !== undefined && value !== null) {
      fieldsToUpdate.push(`${field} = ?`);
      values.push(value);
    }
  };

  addToUpdate("user_name", user_name);
  addToUpdate("last_name", last_name);
  addToUpdate("email", email);
  addToUpdate("role", role);

  if (fieldsToUpdate.length === 0) return {};

  //insetamos en la base de datos
  const query = `UPDATE Users SET ${fieldsToUpdate.join(", ")} WHERE ID_user = ?`;
  values.push(userId);

  const [result] = await pool.query(query, values);

  if (result.affectedRows === 0) {
    const error = new Error("No se ha podido actualizar el usuario.");
    error.httpStatus = 500;
    error.code = "UPDATE_USER_ERROR";
    throw error;
  }

  return result;
};
