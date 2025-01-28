import { getPool } from "../../database/getPool.js";
import { databaseInsertError } from "../../Services/error/errorDataBase.js";

export const inserOrderAndDiscountModel = async (
  orderId,
  ref,
  ID_customer,
  productId,
  products_amount,
  price,
  discount
) => {
  try {
    const pool = await getPool();

    // Si el producto no existe, lo insertamos en la orden
    await pool.query(
      `INSERT INTO Orders (ID_order, ref_OR, ID_customer, ID_product, product_amount, price, product_discount) VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [orderId, ref, ID_customer, productId, products_amount, price, discount]
    );
  } catch (error) {
    databaseInsertError(
      error.message || "Error en el modelo al insertar la orden con descuento"
    );
  }
};
