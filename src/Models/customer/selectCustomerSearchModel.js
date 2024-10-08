import { getPool } from "../../database/getPool.js";
import { databaseQueryError } from "../../Services/error/errorDataBase.js";

export const selectCustomerSearchModel = async (searchTerm) => {
  try {
    const pool = await getPool();

    const [result] = await pool.query(
      `SELECT c.ID_customer, u.ID_user, c.phone, c.createdAt, u.user_name, u.last_name, u.email, u.active, sa.address, sa.street_number, sa.floor, sa.ladder_door, sa.city, sa.postal_code, sa.country, sa.createdAt FROM Customers c
       LEFT JOIN Users u ON c.ID_user = u.ID_user
       LEFT JOIN Shipping_addresses sa ON c.ID_customer = sa.ID_customer 
       WHERE c.phone LIKE ? OR u.user_name LIKE ? OR u.last_name LIKE ? OR u.email LIKE ?`,
      [
        `%${searchTerm}%`,
        `%${searchTerm}%`,
        `%${searchTerm}%`,
        `%${searchTerm}%`,
      ]
    );

    if (result.length === 0) {
      return null;
    }

    return result;
  } catch (error) {
    databaseQueryError(
      error.message ||
        "Error al obtener la lista de busquedas de clientes desde el modelo"
    );
  }
};
