import { getPool } from "../../database/getPool.js";

export const insertProductModel = async (
  ID_product,
  ref,
  name,
  description,
  price,
  stock,
  category,
  active
) => {
  const pool = getPool();

  const [result] = await pool.query(
    `INSERT INTO Products (ID_product, ref_PR, name, description, price, stock, category, active) VALUES ( ?, ?, ?, ?, ?, ?, ?, ?)`,
    [ID_product, ref, name, description, price, stock, category, active]
  );

  if (result.affectedRows === 0) {
    const error = new Error("No se ha podido insertar el producto");
    error.code = "INSERT_PRODUCT_ERROR";
    throw error;
  }
};
