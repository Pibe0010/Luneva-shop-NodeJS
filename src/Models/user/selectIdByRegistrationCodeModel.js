import { getPool } from "../../database/getPool.js";
import { databaseQueryError } from "../../Services/error/errorDataBase.js";

export const selectIdByRegistrationCodeModel = async (registration_code) => {
  try {
    const pool = await getPool();

    const [result] = await pool.query(
      "SELECT ID_user, registrationCode FROM Users WHERE registrationCode = ?",
      [registration_code]
    );

    if (result.length === 0) {
      return null;
    }

    return result[0];
  } catch (error) {
    databaseQueryError(
      error.message ||
        "Error en el modelo al consultar id_user por código de registro"
    );
  }
};
