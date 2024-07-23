import { getPool } from "../../database/getPool.js";

export const selectOrderSearchModel = async (searchTerm) => {
  const pool = getPool();

  const [rows] = await pool.query(
    `SELECT SELECT ID_order, ref_OR, Users.user_name, Users.last_name, Users.email, Customers.phone, Products.name AS product_name, Products.ref_PR,Products.price, Products.category, product_amount, status, Orders.createdAt, Orders.updatedAt
      FROM Orders
      LEFT JOIN Customers ON Orders.ID_customer = Customers.ID_customer
      LEFT JOIN Users ON Customers.ID_user = Users.ID_user
      LEFT JOIN Products ON Orders.ID_product = Products.ID_product
      WHERE Orders.ref_OR LIKE ?  OR Users.user_name LIKE ? OR Users.last_name LIKE ? OR Users.email LIKE ?
    `,
    [`%${searchTerm}%`, `%${searchTerm}%`, `%${searchTerm}%`, `%${searchTerm}%`]
  );

  return rows;
};
