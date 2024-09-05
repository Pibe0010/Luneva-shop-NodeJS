import { getPool } from "../../database/getPool.js";
import { databaseInsertError } from "../../Services/error/errorDataBase.js";

export const inserOrderModel = async (
  orderId,
  ref,
  ID_customer,
  productId,
  products_amount,
  price
) => {
  try {
    const pool = await getPool();

    // Insertamos la orden
    const result = await pool.query(
      `INSERT INTO Orders  (ID_order, ref_OR, ID_customer, ID_product, product_amount, price) VALUES (?,?,?,?,?,?)`,
      [orderId, ref, ID_customer, productId, products_amount, price]
    );

    if (result.affectedRows === 0) {
      databaseInsertError("No se ha podido crear la orden de el producto");
    }
  } catch (error) {
    databaseInsertError(
      error.message || "Error en el modelo al insertar la orden"
    );
  }
};
