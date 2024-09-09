import { getPool } from "../../database/getPool.js";
import { databaseQueryError } from "../../Services/error/errorDataBase.js";
import { notFoundError } from "../../Services/error/errorService.js";

export const selectTicketByIdModel = async (ID_ticket) => {
  try {
    const pool = await getPool();

    const [rows] = await pool.query(
      `SELECT Ticket_purchases.ID_ticket, Ticket_purchases.ID_order, Orders.product_amount, Orders.price, Products.name, Users.user_name 
      FROM Ticket_purchases 
          INNER JOIN Orders  ON Ticket_purchases.ID_order = Orders.ID_order 
          INNER JOIN Customers  ON Orders.ID_customer = Customers.ID_customer
          INNER JOIN Users  ON Customers.ID_user = Users.ID_user
          INNER JOIN Products  ON Orders.ID_product = Products.ID_product 
          WHERE Ticket_purchases.ID_ticket = ?`,
      [ID_ticket]
    );

    if (!rows || rows.length === 0) {
      notFoundError("SalesProduct");
    }

    return rows[0];
  } catch (error) {
    databaseQueryError(
      error.message ||
        "Error al obtener el ticket de compra por ID en la base de datos"
    );
  }
};
