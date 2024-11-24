import { getPool } from "../../database/getPool.js";
import { databaseQueryError } from "../../Services/error/errorDataBase.js";

export const getOrderListModel = async () => {
  try {
    const pool = await getPool();

    const result = await pool.query(`
        SELECT ID_order, ref_OR, Users.user_name, Users.last_name, Users.email, Customers.phone, Products.name, Products.ref_PR, Orders.price, Products.category, Orders.product_amount, Orders.status, Orders.product_discount, Orders.createdAt, Orders.updatedAt
        FROM Orders
        LEFT JOIN Customers ON Orders.ID_customer = Customers.ID_customer
        LEFT JOIN Users ON Customers.ID_user = Users.ID_user
        LEFT JOIN Products ON Orders.ID_product = Products.ID_product
      `);

    if (result.length === 0) {
      return null;
    }

    return result[0];
  } catch (error) {
    databaseQueryError(
      error.message || "Error al obtener la lista de ordenes desde el modelo"
    );
  }
};
