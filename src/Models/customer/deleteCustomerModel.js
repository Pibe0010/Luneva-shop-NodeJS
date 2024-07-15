import { getPool } from "../../database/getPool.js";

export const deleteCustomerModel = async (ID_user) => {
  const pool = await getPool();

  const [result] = await pool.query("DELETE FROM Customers WHERE ID_user = ?", [
    ID_user,
  ]);
  await pool.query("DELETE FROM Users WHERE ID_user = ?", [ID_user]);

  if (result.affectedRows === 0) {
    const error = new Error("No se ha podido eliminar el cliente");
    error.code = "DELETE_CUSTOMER_ERROR";
    throw error;
  }
  return { message: "Cliente eliminado correctamente" };
};
