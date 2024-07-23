import { getPool } from "../../database/getPool.js";

export const inserOrderModel = async (
  orderId,
  ref,
  customer,
  productId,
  products_amount
) => {
  const pool = await getPool();

  // Insertamos la orden
  const result = await pool.query(
    `INSERT INTO Orders  (ID_order, ref_OR, ID_customer, ID_product, product_amount) VALUES (?,?,?,?,?)`,
    [orderId, ref, customer, productId, products_amount]
  );

  if (result.affectedRows === 0) {
    const error = new Error("No se ha podido crear la orden de el producto");
    error.httpStatus = 500;
    error.code = "INSERT_ORDER_ERROR";
    throw error;
  }
};
