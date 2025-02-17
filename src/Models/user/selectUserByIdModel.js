import { getPool } from "../../database/getPool.js";
import { databaseQueryError } from "../../Services/error/errorDataBase.js";

export const selectUserByIdModel = async (ID_user) => {
  try {
    const pool = await getPool();

    const [user] = await pool.query(
      `SELECT Users.ID_user, Customers.ID_customer,Users.password, Users.user_name, Users.last_name, Users.email, Users.active, Users.avatar, Customers.phone 
        FROM Users
        LEFT JOIN Customers ON Users.ID_user = Customers.ID_user
        WHERE Users.ID_user = ?`,
      [ID_user]
    );

    if (user.length === 0) {
      return null;
    }

    return user[0];
  } catch (error) {
    databaseQueryError(
      error.message || "Error al obtener el usuario en el modelo"
    );
  }
};
