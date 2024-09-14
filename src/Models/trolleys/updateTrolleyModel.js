import { getPool } from "../../database/getPool.js";
import { databaseQueryError } from "../../Services/error/errorDataBase.js";

export const updateTrolleyModel = async (
  trolley,
  ID_product,
  products_amount
) => {
  try {
    const pool = await getPool();

    // Obtener el stock del producto
    const [productStockResult] = await pool.query(
      `SELECT Stock FROM Products WHERE ID_product = ?`,
      [ID_product]
    );

    // Obtener la cantidad actual en el carrito
    const [productAmountResult] = await pool.query(
      `SELECT products_amount FROM Trolleys WHERE ID_trolley = ?`,
      [trolley]
    );

    // Obtenemos el cantidad del carrito como un número
    const productStock = Number(productStockResult[0].Stock);
    const trolleyQuantity = Number(productAmountResult[0].products_amount);

    const namberModify = (storage, number) => {
      return storage + number;
    };

    // Sumamos la cantidad de producto
    const stockProduct = namberModify(productStock, trolleyQuantity);

    await pool.query(`UPDATE Products SET Stock = ? WHERE ID_product = ?`, [
      stockProduct,
      ID_product,
    ]);

    // Restamos la cantidad de producto
    const namberModifyStock = (storage, number) => {
      return storage - number;
    };

    // Obtenemos el stock como un número
    const stock = Number(productStockResult[0].Stock);
    const quantity = Number(products_amount);

    const update = namberModifyStock(stock, quantity);

    await pool.query(`UPDATE Products SET Stock = ? WHERE ID_product = ?`, [
      update,
      ID_product,
    ]);

    // Actualizar el carrito
    const [result] = await pool.query(
      `UPDATE Trolleys SET products_amount = ? WHERE ID_trolley = ? `,
      [products_amount, trolley, ID_product]
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
