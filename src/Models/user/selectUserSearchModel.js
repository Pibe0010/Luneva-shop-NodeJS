import { getPool } from "../../database/getPool.js";
import { databaseQueryError } from "../../Services/error/errorDataBase.js";

export const selectUserSearchModel = async (searchTerm) => {
  try {
    const pool = await getPool();

    const [result] = await pool.query(
      `SELECT Users.ID_user, Customers.ID_customer, Users.user_name, Users.last_name, Users.email, Users.role, Users.createdAt, Customers.phone, Shipping_addresses.address, Shipping_addresses.street_number, Shipping_addresses.floor, Shipping_addresses.ladder_door, Shipping_addresses.city, Shipping_addresses.postal_code, Shipping_addresses.country 
      FROM Users
      LEFT JOIN Customers ON Users.ID_user = Customers.ID_user
      LEFT JOIN Shipping_addresses ON Customers.ID_customer = Shipping_addresses.ID_customer
       WHERE user_name LIKE? OR last_name LIKE? OR email LIKE?`,
      [`%${searchTerm}%`, `%${searchTerm}%`, `%${searchTerm}%`]
    );

    if (result.length === 0) {
      return null;
    }

    return result;
  } catch (error) {
    databaseQueryError(
      error.message ||
        "Error al obtener la lista de busquedas de usuarios desde el modelo"
    );
  }
};
