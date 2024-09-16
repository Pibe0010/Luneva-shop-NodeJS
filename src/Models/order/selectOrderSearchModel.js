import { getPool } from "../../database/getPool.js";
import { databaseQueryError } from "../../Services/error/errorDataBase.js";

export const selectOrderSearchModel = async (searchTerm) => {
  try {
    const pool = await getPool();

    const [result] = await pool.query(
      `SELECT Orders.ID_order, Orders.ref_OR, Users.user_name, Users.last_name, Users.email, Customers.phone, Products.name , Products.ref_PR, Products.price, Products.category, Orders.product_amount, Orders.status, Orders.createdAt, Orders.updatedAt
        FROM Orders
        LEFT JOIN Customers ON Orders.ID_customer = Customers.ID_customer
        LEFT JOIN Users ON Customers.ID_user = Users.ID_user
        LEFT JOIN Products ON Orders.ID_product = Products.ID_product
        WHERE Orders.ref_OR LIKE ?  OR Users.user_name LIKE ? OR Users.last_name LIKE ? OR Users.email LIKE ?
      `,
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
        "Error al obtener la lista de busquedas de ordenes desde el modelo"
    );
  }
};
