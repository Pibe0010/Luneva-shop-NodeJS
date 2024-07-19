import { getPool } from "../../database/getPool.js";

export const getTrolleyProductListModel = async (customer_id) => {
  const pool = getPool();

  // Obtengo la lista de el producto del carrito del cliente
  const result = await pool.query(
    `SELECT Trolleys.ID_trolley, Products.Name, Products.Price, Products.image_one, Trolleys.products_amount 
     FROM Trolleys 
     LEFT JOIN Products ON Trolleys.ID_product = Products.ID_product 
     WHERE ID_customer LIKE ?`,
    [customer_id]
  );

  return result[0];
};
