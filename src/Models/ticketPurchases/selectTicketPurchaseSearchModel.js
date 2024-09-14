import { getPool } from "../../database/getPool.js";
import { databaseQueryError } from "../../Services/error/errorDataBase.js";

export const selectTicketPurchaseSearchModel = async (searchTerm) => {
  try {
    const pool = await getPool();

    const [result] = await pool.query(
      `SELECT Ticket_purchases.ID_ticket, Ticket_purchases.ID_order, Orders.ref_OR, Orders.product_amount, Orders.price, Products.name, Users.user_name, Users.last_name, Users.email, Ticket_purchases.createdAt, Ticket_purchases.updatedAt 
      FROM Ticket_purchases
        LEFT JOIN Orders  ON Ticket_purchases.ID_order = Orders.ID_order 
        LEFT JOIN Customers  ON Orders.ID_customer = Customers.ID_customer
        LEFT JOIN Users  ON Customers.ID_user = Users.ID_user
        LEFT JOIN Products  ON Orders.ID_product = Products.ID_product 
        WHERE Orders.ref_OR LIKE ?  OR Users.user_name LIKE ? OR Users.last_name LIKE ? OR Users.email LIKE ?`,
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
      "Error desde el modelo al buscar tickets de compras en la base de datos"
    );
  }
};
