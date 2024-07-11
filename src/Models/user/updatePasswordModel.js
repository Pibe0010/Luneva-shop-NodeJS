import { getPool } from "../../database/getPool.js";

export const updatePasswordModel = async (ID_user, hashedPassword) => {
  const pool = getPool();

  const query = `
    UPDATE Users
    SET password = ?
    WHERE id_user = ?
  `;

  try {
    const [result] = await pool.execute(query, [hashedPassword, ID_user]);
    console.log(`Actualizando contraseña: ${JSON.stringify(result)}`);
    return { message: "Contraseña actualizada correctamente" };
  } catch (error) {
    console.error(`Error al actualizar contraseña: ${error.message}`);
    throw error;
  }
};
