import { getPool } from "../../database/getPool.js";
import { databaseQueryError } from "../../Services/error/errorDataBase.js";

export const selectOfferSearchModel = async (searchTerm) => {
  try {
    const pool = await getPool();

    const [result] = await pool.query(
      `SELECT Offers.ID_offer, Offers.discount_rate, Offers.start_date, Offers.ending_date, Offers.active,  Products.ref_PR, Products.name, Products.price FROM Offers 
      LEFT JOIN Products ON Offers.ID_product = Products.ID_product 
      WHERE Products.name LIKE? OR Products.price LIKE? OR Offers.discount_rate LIKE?`,
      [`%${searchTerm}%`, `%${searchTerm}%`, `%${searchTerm}%`]
    );

    if (result.length === 0) {
      return null;
    }

    return result;
  } catch (error) {
    databaseQueryError(
      error.message ||
        "Error al obtener la lista de busquedas de ofertas desde el modelo"
    );
  }
};
