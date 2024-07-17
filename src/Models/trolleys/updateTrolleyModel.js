import { getPool } from "../../database/getPool.js";

export const updateTrolleyModel = async (
  trolley,
  ID_product,
  products_amount,
  isAdding // Nuevo parámetro para indicar si se está agregando o quitando el producto
) => {
  const pool = getPool();

  // Obtener el stock del producto
  const [productStockResult] = await pool.query(
    `SELECT Stock FROM Products WHERE ID_product = ?`,
    [ID_product]
  );

  // Obtener la cantidad actual en el carrito
  const [productAmountResult] = await pool.query(
    `SELECT products_amount FROM Trolleys WHERE ID_product = ? AND ID_trolley = ?`,
    [ID_product, trolley]
  );

  let stock;
  let currentAmount = 0;
  if (productStockResult.length > 0) {
    stock = Number(productStockResult[0].Stock);
  } else {
    console.error("Producto no encontrado");
    return;
  }

  if (productAmountResult.length > 0) {
    currentAmount = Number(productAmountResult[0].products_amount);
  }

  // Calcular la diferencia basada en si estamos agregando o quitando
  const difference = isAdding
    ? currentAmount + products_amount
    : currentAmount - products_amount;

  // Verificar si hay suficiente stock si se añade producto
  if ((isAdding && stock < difference) || (!isAdding && stock > difference)) {
    console.error("Stock insuficiente");
    return;
  }

  // Actualizar el stock
  const newStock = isAdding ? stock + products_amount : stock - products_amount;

  if (newStock < 0) {
    console.error("Error: el stock no puede ser negativo");
    return;
  }

  await pool.query(`UPDATE Products SET Stock = ? WHERE ID_product = ?`, [
    newStock,
    ID_product,
  ]);

  // Actualizar el carrito
  const [result] = await pool.query(
    `UPDATE Trolleys SET products_amount = ? WHERE ID_trolley = ? AND ID_product = ?`,
    [products_amount, trolley, ID_product]
  );

  if (result.affectedRows === 0) {
    const error = new Error("No se ha podido insertar el producto.");
    error.code = "INSERT_PRODUCTS_ERROR";
    throw error;
  }
};
