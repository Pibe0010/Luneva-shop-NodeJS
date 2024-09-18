import { getPool } from "../../database/getPool.js";
import { databaseInsertError } from "../../Services/error/errorDataBase.js";

export const updateShippingAddressModel = async (
  ID_address,
  address,
  city,
  postal_code,
  country,
  floor,
  ladder_door,
  street_number
) => {
  try {
    const pool = await getPool();

    const fieldsToUpdate = [];
    const values = [];

    const addToUpdate = (field, value) => {
      if (value !== undefined && value !== null) {
        fieldsToUpdate.push(`${field} = ?`);
        values.push(value);
      }
    };

    addToUpdate("address", address);
    addToUpdate("city", city);
    addToUpdate("postal_code", postal_code);
    addToUpdate("country", country);
    addToUpdate("floor", floor);
    addToUpdate("ladder_door", ladder_door);
    addToUpdate("street_number", street_number);

    if (fieldsToUpdate.length === 0) return {}; // No hay campos para actualizar, salir

    const query = `UPDATE Shipping_addresses SET ${fieldsToUpdate.join(", ")} WHERE ID_address = ?`;
    values.push(ID_address);

    const [result] = await pool.query(query, values);

    if (result.affectedRows === 0) {
      databaseInsertError("No se ha podido actualizar la dirección");
    }
  } catch (error) {
    databaseInsertError(
      error.message || "Error en el modelo al actualizar la dirección "
    );
  }
};
