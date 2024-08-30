import { getPool } from "../../database/getPool.js";
import { databaseInsertError } from "../../Services/error/errorDataBase.js";

export const selectOfferByIdModel = async (ID_offer) => {
  try {
    const pool = getPool();

    const [offer] = await pool.query(
      "SELECT Offers.ID_offer, products.ID_Product,Products.name, products.description, products.price, products.Stock, products.image_one, discount_rate, Offers.active, start_date, ending_date, Offers.createdAt  FROM Offers LEFT JOIN Products ON Offers.ID_product = Products.ID_product  WHERE ID_offer = ?",
      [ID_offer]
    );

    return offer[0];
  } catch (error) {
    databaseInsertError(
      error.message || "Error en el modelo al seleccionar una oferta"
    );
  }
};
