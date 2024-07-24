import { getPool } from "../../database/getPool.js";

export const insertShippingAddressModel = async (
  ID_address,
  ID_customer,
  address,
  street_number,
  floor,
  ladder_door,
  city,
  postal_code,
  country
) => {
  const pool = getPool();

  const [result] = await pool.query(
    `INSERT INTO Shipping_Addresses (
            ID_address,
            ID_customer,
            address,
            street_number,
            floor,
            ladder_door,
            city,
            postal_code,
            country
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      ID_address,
      ID_customer,
      address,
      street_number,
      floor,
      ladder_door,
      city,
      postal_code,
      country,
    ]
  );

  if (result.affectedRows === 0) {
    const error = new Error("No se ha podido insertar el Dirección");
    error.code = "INSERT_ADDRESS_ERROR";
    throw error;
  }
};
