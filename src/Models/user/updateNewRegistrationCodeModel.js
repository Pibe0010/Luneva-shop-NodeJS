import { getPool } from "../../database/getPool.js";
import { databaseUpdateError } from "../../Services/error/errorDataBase.js";

export const updateNewRegistrationCodeModel = async (
  id_user,
  new_registration_code
) => {
  try {
    const dbPool = await getPool();

    const query = `UPDATE Users SET registration_code = ? WHERE id_user = ?`;

    const values = [new_registration_code, id_user];
    const [rows] = await dbPool.query(query, values);

    if (rows.affectedRows === 0) {
      databaseUpdateError("No se ha podido actualizar el código de registro.");
    }

    return rows;
  } catch (error) {
    databaseUpdateError(
      error.message || "Error en el modelo al actualizar el código de registro"
    );
  }
};
