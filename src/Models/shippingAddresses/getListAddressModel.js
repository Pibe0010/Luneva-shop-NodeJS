import { getPool } from "../../database/getPool.js";
import { databaseQueryError } from "../../Services/error/errorDataBase.js";

export const getListAddressModel = async () => {
  try {
    const pool = await getPool();

    const result = await pool.query(
      `SELECT ID_address,Customers.ID_customer, address, street_number, floor, ladder_door, postal_code, city, country, Shipping_addresses.createdAt, Users.user_name, Users.last_name, Users.email
      FROM Shipping_addresses
      LEFT JOIN Customers ON Shipping_addresses.ID_customer = Customers.ID_customer
      LEFT JOIN Users ON Users.ID_user = customers.ID_user 
      `
    );

    if (result.length === 0) {
      return null;
    }

    return result[0];
  } catch (error) {
    databaseQueryError(
      error.message ||
        "Error al obtener la lista de direcciónes de envios desde el modelo"
    );
  }
};
