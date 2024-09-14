import { getPool } from "../../database/getPool.js";
import { databaseInsertError } from "../../Services/error/errorDataBase.js";

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
  try {
    const pool = await getPool();

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
      databaseInsertError("No se ha podido insertar el Dirección");
    }
  } catch (error) {
    databaseInsertError(
      error.message || "Error en el modelo al insertar la dirección deenvio"
    );
  }
};
