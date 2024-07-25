import { getPool } from "../../database/getPool.js";

export const deleteShippingAddressModel = async (address) => {
  const pool = getPool();

  const [result] = await pool.query(
    `DELETE FROM Shipping_addresses WHERE ID_customer = ?`,
    [address]
  );

  if (result.affectedRows === 0) {
    const error = new Error("No se ha podido eliminar la dirección.");
    error.code = "DELETE_ADDRESS_ERROR";
    throw error;
  }
};
