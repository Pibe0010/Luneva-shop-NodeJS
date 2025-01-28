import { getPool } from "../../database/getPool.js";
import { databaseInsertError } from "../../Services/error/errorDataBase.js";

export const inserOrderModel = async (
  orderId,
  ref,
  ID_customer,
  productId,
  products_amount,
  total_price
) => {
  console.log(
    orderId,
    ref,
    ID_customer,
    productId,
    products_amount,
    " desde el modelo"
  );
  try {
    const pool = await getPool();

    // Si el producto no existe, lo insertamos en la orden
    await pool.query(
      `INSERT INTO Orders (ID_order, ref_OR, ID_customer, ID_product, product_amount, price) VALUES (?, ?, ?, ?, ?, ?)`,
      [orderId, ref, ID_customer, productId, products_amount, total_price]
    );
  } catch (error) {
    databaseInsertError(
      error.message || "Error en el modelo al insertar la orden"
    );
  }
};
