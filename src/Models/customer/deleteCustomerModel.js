import { getPool } from "../../database/getPool.js";
import { databaseDeleteError } from "../../Services/error/errorDataBase.js";

export const deleteCustomerModel = async (ID_user) => {
  try {
    const pool = await getPool();

    const [result] = await pool.query(
      "DELETE FROM Customers WHERE ID_user = ?",
      [ID_user]
    );
    await pool.query("DELETE FROM Users WHERE ID_user = ?", [ID_user]);

    if (result.affectedRows === 0) {
      databaseDeleteError("No se ha podido eliminar el cliente");
    }
    return { message: "Cliente eliminado correctamente" };
  } catch (error) {
    databaseDeleteError(
      error.message || "Error en el modelo al eliminar un cliente",
      "Error en el modelo al eliminar un cliente"
    );
  }
};
