import { getPool } from "../../database/getPool.js";
import { databaseQueryError } from "../../Services/error/errorDataBase.js";

export const getTicketPurshaseListModel = async () => {
  try {
    const pool = await getPool();

    const [result] = await pool.query(
      `SELECT Ticket_purchases.ID_ticket, Ticket_purchases.ID_order, Orders.ref_OR, Orders.product_amount, Orders.price, Products.name, Users.user_name, Users.last_name, Products.name, Ticket_purchases.createdAt, Ticket_purchases.updatedAt 
      FROM Ticket_purchases 
          INNER JOIN Orders  ON Ticket_purchases.ID_order = Orders.ID_order 
          INNER JOIN Customers  ON Orders.ID_customer = Customers.ID_customer
          INNER JOIN Users  ON Customers.ID_user = Users.ID_user
          INNER JOIN Products  ON Orders.ID_product = Products.ID_product 
          `
    );

    if (result.length === 0) {
      return null;
    }

    return result;
  } catch (error) {
    databaseQueryError(
      "Error desde el modelo al obtener la lista de tickets de compra"
    );
  }
};
