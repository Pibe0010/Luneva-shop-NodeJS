import { getPool } from "../../database/getPool.js";

export const getOffersListModel = async () => {
  const pool = await getPool();

  const result = await pool.query(
    `SELECT Offers.ID_offer, products.ID_Product, Products.name, products.description, products.price, products.Stock, products.image_one, Offers.active, discount_rate, start_date, ending_date, Offers.createdAt, Offers.updatedAt  FROM Offers LEFT JOIN Products ON Offers.ID_product = Products.ID_product `
  );
  return result[0];
};
