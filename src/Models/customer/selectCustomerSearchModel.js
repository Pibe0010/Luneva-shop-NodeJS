import { getPool } from "../../database/getPool.js";
import { databaseQueryError } from "../../Services/error/errorDataBase.js";

export const selectCustomerSearchModel = async (searchTerm) => {
  try {
    const pool = getPool();

    const [rows] = await pool.query(
      `SELECT Customers.ID_customer, Users.ID_user, Customers.phone, Customers.createdAt, Users.user_name, Users.last_name, Users.email FROM Customers JOIN Users ON Customers.ID_user = Users.ID_user WHERE Customers.phone LIKE? OR Users.user_name LIKE? OR Users.last_name LIKE? OR Users.email LIKE?`,
      [
        `%${searchTerm}%`,
        `%${searchTerm}%`,
        `%${searchTerm}%`,
        `%${searchTerm}%`,
      ]
    );
    return rows;
  } catch (error) {
    databaseQueryError(
      error.message ||
        "Error al obtener la lista de busquedas de clientes desde el modelo"
    );
  }
};
