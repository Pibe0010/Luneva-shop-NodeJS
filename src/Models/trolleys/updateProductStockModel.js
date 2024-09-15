import { getPool } from "../../database/getPool.js";
import { databaseQueryError } from "../../Services/error/errorDataBase.js";

export const updateProductStockModel = async (ID_trolley, ID_product) => {
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
      [ID_trolley]
    );

    // Obtenemos el cantidad del carrito como un número
    const productStock = Number(productStockResult[0].Stock);
    const trolleyQuantity = Number(productAmountResult[0].products_amount);

    const namberModify = (storage, number) => {
      return storage + number;
    };

    // Sumamos la cantidad de producto
    const stockProduct = namberModify(productStock, trolleyQuantity);

    const result = await pool.query(
      `UPDATE Products SET Stock = ? WHERE ID_product = ?`,
      [stockProduct, ID_product]
    );

    if (result.affectedRows === 0) {
      databaseQueryError("No se ha podido actualizar el stock.");
    }
  } catch (error) {
    databaseQueryError(
      error.message ||
        "Error en el modelo al actualizar el stock del producto en el carrito"
    );
  }
};
