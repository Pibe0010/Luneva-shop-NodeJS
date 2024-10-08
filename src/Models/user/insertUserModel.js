import { getPool } from "../../database/getPool.js";
import { databaseInsertError } from "../../Services/error/errorDataBase.js";

export const insertUserModel = async (
  ID_user,
  user_name,
  last_name,
  email,
  hashed_password,
  registration_code,
  customer
) => {
  try {
    const pool = await getPool();

    const [result] = await pool.query(
      `INSERT INTO Users (ID_user, user_name, last_name, email, password, registrationCode) VALUES (?, ?, ?, ?, ?, ?)`,
      [ID_user, user_name, last_name, email, hashed_password, registration_code]
    );

    // Creamos el cliente
    await pool.query(
      `INSERT INTO Customers  (ID_customer, ID_user) VALUES (?,?)`,
      [customer, ID_user]
    );

    // Verificar si el insert afectó a alguna línea.
    if (result.affectedRows === 0) {
      databaseInsertError("No se ha podido insertar el usuario.");
    }
  } catch (error) {
    databaseInsertError(
      error.message || "Error en el modelo al insertar usuario"
    );
  }
};
