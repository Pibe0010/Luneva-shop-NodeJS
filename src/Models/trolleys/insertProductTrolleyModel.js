import { getPool } from "../../database/getPool.js";

export const insertProductTrolleyModel = async (
  ID_trolley,
  customer,
  ID_product,
  products_amount
) => {
  const pool = getPool();

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
  console.log(productStock, "esto es productStock");

  // Obtenemos el stock como un número
  const stock = Number(productStock[0].Stock);
  const quantity = Number(products_amount);

  console.log(stock, "esto es stock");
  console.log(quantity, "esto es quantity");

  const namberModify = (storage, number) => {
    return storage - number;
  };

  // Restamos la cantidad de productos
  const update = namberModify(stock, quantity);
  console.log(update, "esto es update");

  await pool.query(`UPDATE Products SET stock = ? WHERE ID_product = ?`, [
    update,
    ID_product,
  ]);

  if (result.affectedRows === 0) {
    const error = new Error("No se ha podido insertar el producto.");
    error.code = "INSERT_PRODUCTS_ERROR";
    throw error;
  }
};
