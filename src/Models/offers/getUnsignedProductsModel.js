import { getPool } from "../../database/getPool.js";
import { databaseQueryError } from "../../Services/error/errorDataBase.js";

export const getUnsignedProductsModel = async () => {
  try {
    const pool = await getPool();

    const query = `SELECT ID_product, name, description, price, Stock FROM Products WHERE Products.active = 1`;

    const [result] = await pool.query(query);

    return result;
  } catch (error) {
    databaseQueryError(
      "Error en el modelo al obtener la lista de productos asignada"
    );
  }
};
