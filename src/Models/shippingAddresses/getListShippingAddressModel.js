import { getPool } from "../../database/getPool.js";

export const getListShippingAddressModel = async (customer) => {
  const pool = await getPool();

  const result = await pool.query(
    `SELECT ID_address, address, street_number, floor, ladder_door, postal_code, city, country FROM Shipping_addresses WHERE ID_customer = ?`,
    [customer]
  );

  return result[0];
};
