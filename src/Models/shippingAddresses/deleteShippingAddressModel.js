import { getPool } from "../../database/getPool.js";
import { databaseDeleteError } from "../../Services/error/errorDataBase.js";

export const deleteShippingAddressModel = async (address) => {
  try {
    const pool = await getPool();

    const [result] = await pool.query(
      `DELETE FROM Shipping_addresses WHERE ID_customer = ?`,
      [address]
    );

    if (result.length === 1) {
      databaseDeleteError("No se ha podido eliminar la dirección.");
    }
  } catch (error) {
    databaseDeleteError(
      error.message || "Error en el modelo al eliminiar la dirección de envio",
      "Error en el modelo al eliminiar la dirección de envio"
    );
  }
};
