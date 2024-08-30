import { getPool } from "../../database/getPool.js";
import { databaseQueryError } from "../../Services/error/errorDataBase.js";

export const getOffersListModel = async () => {
  try {
    const pool = await getPool();

    const result = await pool.query(
      `SELECT Offers.ID_offer, products.ID_Product, Products.name, products.description, products.price, products.Stock, products.image_one, Offers.active, discount_rate, start_date, ending_date, Offers.createdAt, Offers.updatedAt  FROM Offers LEFT JOIN Products ON Offers.ID_product = Products.ID_product `
    );
    return result[0];
  } catch (error) {
    databaseQueryError(
      error.message || "Error al obtener la lista de ofertas desde el modelo"
    );
  }
};
