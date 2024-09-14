import { getPool } from "../../database/getPool.js";
import { databaseInsertError } from "../../Services/error/errorDataBase.js";

export const insertProductTrolleyModel = async (
  ID_trolley,
  customer,
  ID_product,
  products_amount
) => {
  try {
    const pool = await getPool();

    // insertamos el producto en el carrito
    const [result] = await pool.query(
      `INSERT INTO Trolleys (ID_trolley, ID_customer, ID_product, products_amount) VALUES ( ?, ?, ?, ?)`,
      [ID_trolley, customer, ID_product, products_amount]
    );

    // Actualizamos el stock del producto
    const [productStock] = await pool.query(
      `SELECT Stock FROM Products WHERE ID_product = ?`,
      [ID_product]
    );

    // Obtenemos el stock como un número
    const stock = Number(productStock[0].Stock);
    const quantity = Number(products_amount);

    const namberModify = (storage, number) => {
      return storage - number;
    };

    // Restamos la cantidad de productos
    const update = namberModify(stock, quantity);

    await pool.query(`UPDATE Products SET stock = ? WHERE ID_product = ?`, [
      update,
      ID_product,
    ]);

    if (result.affectedRows === 0) {
      databaseInsertError("No se ha podido insertar el producto.");
    }
  } catch (error) {
    databaseInsertError(
      error.message || "Error en el modelo al insertar el producto al carrito"
    );
  }
};
