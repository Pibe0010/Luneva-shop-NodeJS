import { getPool } from "../../database/getPool.js";
import { databaseUpdateError } from "../../Services/error/errorDataBase.js";

export const updateUserModel = async (
  userId,
  user_name,
  last_name,
  email,
  role
) => {
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
      databaseUpdateError("No se ha podido actualizar el usuario.");
    }

    return result;
  } catch (error) {
    databaseUpdateError(
      error.message || "Error en el modelo al actualizar usuario"
    );
  }
};
