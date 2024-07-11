import { getPool } from "../../database/getPool.js";

export const selectIdByRegistrationCodeModel = async (registration_code) => {
  try {
    const pool = await getPool();
    const [rows] = await pool.query(
      "SELECT id_user, registration_code FROM Users WHERE registration_code = ?",
      [registration_code]
    );

    return rows[0];
  } catch (error) {
    console.error(`Error al consultar id_user: ${error.message}`);
    throw error;
  }
};
