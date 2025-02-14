import { getPool } from "../../database/getPool.js";
import { databaseQueryError } from "../../Services/error/errorDataBase.js";

export const updateTrolleyModel = async (ID_trolley, products_amount) => {
  try {
    const pool = await getPool();

    // Obtener la cantidad actual en el carrito
    const [productAmountResult] = await pool.query(
      `SELECT products_amount FROM Trolleys WHERE ID_trolley = ?`,
      [ID_trolley]
    );

    // Restamos la cantidad de producto
    const namberModifyStock = (storage, number) => {
      return storage + number;
    };

    // Obtenemos el cantidad del carrito como un número
    const stock = Number(productAmountResult[0].products_amount);
    const quantity = Number(products_amount);

    const update = namberModifyStock(stock, quantity);

    // Actualizar el carrito
    const [result] = await pool.query(
      `UPDATE Trolleys SET products_amount = ? WHERE ID_trolley = ? `,
      [update, ID_trolley]
    );

    if (result.affectedRows === 0) {
      databaseQueryError("No se ha podido actualizar el carrito.");
    }
  } catch (error) {
    databaseQueryError(
      error.message || "Error en el modelo al actualizar el carrito"
    );
  }
};
