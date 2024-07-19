import { getPool } from "../../database/getPool.js";

export const updateProductStockDeleteModel = async (trolley) => {
  const pool = getPool();

  // Obtener la cantidad actual en el carrito
  const [productAmountResult] = await pool.query(
    `SELECT products_amount, ID_product FROM Trolleys WHERE ID_trolley = ?`,
    [trolley]
  );

  const ID_product = productAmountResult[0].ID_product;

  // Obtener el stock del producto
  const [productStockResult] = await pool.query(
    `SELECT Stock FROM Products WHERE ID_product = ?`,
    [ID_product]
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
    const error = new Error("No se ha podido insertar el producto.");
    error.code = "INSERT_PRODUCTS_ERROR";
    throw error;
  }
};
