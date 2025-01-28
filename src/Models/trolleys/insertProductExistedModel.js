import { getPool } from "../../database/getPool.js";
import { databaseInsertError } from "../../Services/error/errorDataBase.js";

export const insertProductExistedTrolleyModel = async (
  ID_trolley,
  ID_product,
  products_amount
) => {
  try {
    const pool = await getPool();

    console.log(products_amount);

    // Verificar si el producto ya existe en el carrito
    const [existingProduct] = await pool.query(
      `SELECT ID_trolley, products_amount FROM Trolleys WHERE ID_trolley = ? AND ID_product = ?`,
      [ID_trolley, ID_product]
    );

    if (existingProduct.length > 0) {
      // Producto existe, actualizar cantidad
      const currentAmount = Number(existingProduct[0].products_amount);
      const newAmount = currentAmount + Number(products_amount);

      await pool.query(
        `UPDATE Trolleys SET products_amount = ? WHERE ID_trolley = ? AND ID_product = ?`,
        [newAmount, ID_trolley, ID_product]
      );
    } else {
      throw new Error("El producto no existe en el carrito.");
    }

    // Actualizamos el stock del producto
    const [productStock] = await pool.query(
      `SELECT Stock FROM Products WHERE ID_product = ?`,
      [ID_product]
    );

    // Obtenemos el stock como un número
    const stock = Number(productStock[0].Stock);
    const quantity = Number(products_amount);

    const updateStock = stock - quantity;

    if (updateStock < 0) {
      throw new Error("No hay suficiente stock disponible.");
    }

    await pool.query(`UPDATE Products SET stock = ? WHERE ID_product = ?`, [
      updateStock,
      ID_product,
    ]);
  } catch (error) {
    databaseInsertError(
      error.message || "Error en el modelo al insertar el producto al carrito"
    );
  }
};
