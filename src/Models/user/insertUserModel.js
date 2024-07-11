import { getPool } from "../../database/getPool.js";

export const insertUserModel = async (
  ID_user,
  user_name,
  last_name,
  email,
  hashed_password,
  registration_code,
  customer
) => {
  const pool = getPool();

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
    const error = new Error("No se ha podido insertar el user.");
    error.code = "INSERT_USER_ERROR";
    throw error;
  }
};
