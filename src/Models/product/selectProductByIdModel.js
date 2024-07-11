import { getPool } from "../../database/getPool.js";

export const selectProductByIdModel = async (ID_product) => {
  const pool = getPool();

  //Comprobamos si existe el producto
  const [product] = await pool.query(
    "SELECT * FROM Products WHERE ID_product= ?",
    [ID_product]
  );
  return product[0];
};
