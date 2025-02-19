import { getPool } from "../../database/getPool.js";
import { databaseQueryError } from "../../Services/error/errorDataBase.js";

export const getTicketPurshaseListModel = async () => {
  try {
    const pool = await getPool();

    const [result] = await pool.query(
      `SELECT Ticket_purchases.ID_ticket, Ticket_purchases.ID_payment, Orders.ref_OR, Orders.product_amount, Orders.product_discount, Products.name, Products.price AS product_price, Users.user_name, Users.last_name,Ticket_purchases.status, Ticket_purchases.createdAt, Payments.total_amount, Payments.iva_payments, Payments.shipment_cost, Offers.discount_rate AS offer_discount, Ticket_purchases.updatedAt 
      FROM Ticket_purchases 
          INNER JOIN Payments  ON Ticket_purchases.ID_payment = Payments.ID_payment
          INNER JOIN Orders  ON Orders.ID_order = Payments.ID_order
          INNER JOIN Customers  ON Orders.ID_customer = Customers.ID_customer
          INNER JOIN Users  ON Customers.ID_user = Users.ID_user
          INNER JOIN Products  ON Orders.ID_product = Products.ID_product
          LEFT JOIN Offers  ON Products.ID_product = Offers.ID_product
          ORDER BY Orders.ref_OR ASC
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
