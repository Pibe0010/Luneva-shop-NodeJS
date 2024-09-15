import { getPool } from "../../database/getPool.js";
import { databaseInsertError } from "../../Services/error/errorDataBase.js";
import { selectUserByIdModel } from "../user/selectUserByIdModel.js";

export const updateCustomerModel = async (
  ID_user,
  user_name,
  last_name,
  email
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

    if (fieldsToUpdate.length === 0) return {};

    //insetamos en la base de datos
    const query = `UPDATE Users SET ${fieldsToUpdate.join(", ")} WHERE ID_user = ?`;
    values.push(ID_user);

    const [result] = await pool.query(query, values);

    if (result.affectedRows === 0) {
      databaseInsertError("No se ha podido actualizar el Cliente.");
    }

    const response = await selectUserByIdModel(ID_user);
    return response;
  } catch (error) {
    databaseInsertError(
      error.message || "Error en el modelo al actualizar el cliente"
    );
  }
};
