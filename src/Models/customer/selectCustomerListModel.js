import { getPool } from "../../database/getPool.js";

export const selectCustomerListModel = async () => {
  const pool = getPool();

  // Obtengo la lista de clientes
  const query = `SELECT Customers.ID_customer, Users.ID_user, Customers.phone, Customers.createdAt, Users.user_name, Users.last_name, Users.email FROM Customers JOIN Users ON Customers.ID_user = Users.ID_user`;

  const [rows] = await pool.query(query);
  return rows;
};
