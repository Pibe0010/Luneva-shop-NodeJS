import { getPool } from "../../database/getPool.js";
import { databaseInsertError } from "../../Services/error/errorDataBase.js";

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
  try {
    const pool = await getPool();

    const [result] = await pool.query(
      `INSERT INTO Products (ID_product, ref_PR, name, description, price, stock, category, active) VALUES ( ?, ?, ?, ?, ?, ?, ?, ?)`,
      [ID_product, ref, name, description, price, stock, category, active]
    );

    if (result.affectedRows === 0) {
      databaseInsertError("No se ha podido insertar el producto");
    }
  } catch (error) {
    databaseInsertError(
      error.message || "Error en el modelo al insertar el producto"
    );
  }
};
