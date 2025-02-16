import { getPool } from "../../database/getPool.js";
import { databaseQueryError } from "../../Services/error/errorDataBase.js";

export const selectTicketByIdModel = async (ID_ticket) => {
  try {
    const pool = await getPool();

    const [result] = await pool.query(
      `SELECT Ticket_purchases.ID_ticket, Ticket_purchases.ID_payment, Payments.ref_PM, Payments.payment_method, Payments.status, Payments.total_amount, Payments.iva_payments, Payments.shipment_cost, Payments.createdAt, Payments.updatedAt,  Products.name, Users.user_name 
      FROM Ticket_purchases 
          INNER JOIN Payments  ON Ticket_purchases.ID_payment = Payments.ID_payment
          INNER JOIN Orders  ON Orders.ID_order = Payments.ID_order
          INNER JOIN Customers  ON Orders.ID_customer = Customers.ID_customer
          INNER JOIN Users  ON Customers.ID_user = Users.ID_user
          INNER JOIN Products  ON Orders.ID_product = Products.ID_product 
          WHERE Ticket_purchases.ID_ticket = ?`,
      [ID_ticket]
    );

    if (result.length === 0) {
      return null;
    }

    return result[0];
  } catch (error) {
    databaseQueryError(
      error.message ||
        "Error al obtener el ticket de compra por ID en la base de datos"
    );
  }
};
