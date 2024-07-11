import { getPool } from "../../database/getPool.js";

export const inserOrderModel = async (
  orderId,
  ID_user,
  customer,
  productId,
  amount
) => {
  const pool = await getPool();

  // Insertamos el cliente
  await pool.query(
    `INSERT INTO Customers  (ID_customer, ID_user) VALUES (?,?)`,
    [customer, ID_user]
  );

  // Insertamos la orden
  const result = await pool.query(
    `INSERT INTO Orders  (ID_order, ID_customer, ID_product, amount) VALUES (?,?,?,?)`,
    [orderId, customer, productId, amount]
  );

  if (result.affectedRows === 0) {
    const error = new Error("No se ha podido crear la orden de el producto");
    error.httpStatus = 500;
    error.code = "INSERT_ORDER_ERROR";
    throw error;
  }
};
