import { getPool } from "../../database/getPool.js";

export const selectShippingAddressByIdModel = async (customer) => {
  const pool = await getPool();

  const [result] = await pool.query(
    `SELECT ID_address, address, city, postal_code, country, floor, ladder_door, street_number FROM Shipping_addresses WHERE ID_customer = ?`,
    [customer]
  );

  return result[0];
};
