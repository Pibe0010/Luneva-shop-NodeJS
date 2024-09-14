import { getPool } from "../../database/getPool.js";
import { databaseQueryError } from "../../Services/error/errorDataBase.js";

export const selectCustomerListModel = async () => {
  try {
    const pool = await getPool();

    const query = `SELECT Customers.ID_customer, Users.ID_user, Customers.phone, Customers.createdAt, Users.user_name, Users.last_name, Users.email FROM Customers JOIN Users ON Customers.ID_user = Users.ID_user`;

    const [rows] = await pool.query(query);
    return rows;
  } catch (error) {
    databaseQueryError(
      error.message || "Error al obtener la lista de clientes desde el modelo"
    );
  }
};
