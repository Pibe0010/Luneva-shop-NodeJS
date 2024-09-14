import { getPool } from "../../database/getPool.js";
import { databaseQueryError } from "../../Services/error/errorDataBase.js";

export const getTrolleyProductListModel = async (customer_id) => {
  try {
    const pool = await getPool();

    // Obtengo la lista de el producto del carrito del cliente
    const result = await pool.query(
      `SELECT Trolleys.ID_trolley, Products.Name, Products.Price, Products.image_one, Trolleys.products_amount 
       FROM Trolleys 
       LEFT JOIN Products ON Trolleys.ID_product = Products.ID_product 
       WHERE ID_customer LIKE ?`,
      [customer_id]
    );

    if (result.length === 0) {
      return null;
    }

    return result[0];
  } catch (error) {
    databaseQueryError(
      error.message ||
        "Error al obtener la lista de productos del carrito desde el modelo"
    );
  }
};
