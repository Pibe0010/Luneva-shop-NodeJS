import { getPool } from "../../database/getPool.js";
import { databaseQueryError } from "../../Services/error/errorDataBase.js";

export const selectProductByIdModel = async (ID_product) => {
  try {
    const pool = await getPool();

    //Comprobamos si existe el producto
    const [product] = await pool.query(
      "SELECT * FROM Products WHERE ID_product= ?",
      [ID_product]
    );

    if (product.length === 0) {
      return null;
    }

    return product[0];
  } catch (error) {
    databaseQueryError(
      error.message || "Error en el modelo al obtener el producto"
    );
  }
};
