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

    let returnedIDTrolley;

    // Verificar si el producto ya existe en el carrito
    const [existingProduct] = await pool.query(
      `SELECT ID_trolley, products_amount FROM Trolleys WHERE ID_customer = ? AND ID_product = ?`,
      [customer, ID_product]
    );

    if (existingProduct.length > 0) {
      // Si el producto ya existe, actualizamos la cantidad
      const currentAmount = Number(existingProduct[0].products_amount);
      const newAmount = currentAmount + Number(products_amount);

      await pool.query(
        `UPDATE Trolleys SET products_amount = ? WHERE ID_customer = ? AND ID_product = ?`,
        [newAmount, customer, ID_product]
      );

      // Recuperamos el ID_trolley existente
      returnedIDTrolley = existingProduct[0].ID_trolley;
    } else {
      // Si el producto no existe, lo insertamos en el carrito
      await pool.query(
        `INSERT INTO Trolleys (ID_trolley, ID_customer, ID_product, products_amount) VALUES (?, ?, ?, ?)`,
        [ID_trolley, customer, ID_product, products_amount]
      );
      // Recuperamos el ID_trolley del nuevo registro
      returnedIDTrolley = ID_trolley;
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

    return returnedIDTrolley;
  } catch (error) {
    databaseInsertError(
      error.message || "Error en el modelo al insertar el producto al carrito"
    );
  }
};
