import { getPool } from "../../database/getPool.js";
import { databaseQueryError } from "../../Services/error/errorDataBase.js";

export const selectSearchShippingAddressModel = async (searchTerm) => {
  try {
    const pool = await getPool();

    const [result] = await pool.query(
      `SELECT Shipping_addresses.ID_address,Shipping_addresses.address,Shipping_addresses.street_number,Shipping_addresses.floor,Shipping_addresses.ladder_door,Shipping_addresses.city,Shipping_addresses.postal_code,Shipping_addresses.country,Shipping_addresses.createdAt, Users.user_name, Users.last_name, Users.email 
      FROM Shipping_addresses
      LEFT JOIN Customers ON Shipping_addresses.ID_customer = Customers.ID_customer
      LEFT JOIN Users ON Customers.ID_user = Users.ID_user 
      WHERE Users.user_name LIKE? OR Users.last_name LIKE? OR shipping_addresses.address LIKE? OR shipping_addresses.city LIKE?`,
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
        "Error al obtener la lista de busquedas de direciònes desde el modelo"
    );
  }
};
