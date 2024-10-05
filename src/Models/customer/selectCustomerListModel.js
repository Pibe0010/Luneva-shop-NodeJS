import { getPool } from "../../database/getPool.js";
import { databaseQueryError } from "../../Services/error/errorDataBase.js";

export const selectCustomerListModel = async () => {
  try {
    const pool = await getPool();

    const query = `SELECT Customers.ID_customer, Users.ID_user, Customers.phone, Customers.createdAt, Users.user_name, Users.last_name, Users.email, Users.active, Shipping_addresses.address, Shipping_addresses.street_number, Shipping_addresses.floor, Shipping_addresses.ladder_door, Shipping_addresses.city, Shipping_addresses.postal_code, Shipping_addresses.country, Shipping_addresses.createdAt FROM Customers 
    LEFT JOIN Users ON Customers.ID_user = Users.ID_user
    LEFT JOIN Shipping_addresses ON Customers.ID_customer = Shipping_addresses.ID_customer`;

    const [rows] = await pool.query(query);
    return rows;
  } catch (error) {
    databaseQueryError(
      error.message || "Error al obtener la lista de clientes desde el modelo"
    );
  }
};
