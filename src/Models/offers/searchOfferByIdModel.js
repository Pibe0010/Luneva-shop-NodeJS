import { getPool } from "../../database/getPool.js";

export const searchOfferByIdModel = async (ID_product) => {
  const pool = getPool();

  const [offer] = await pool.query(
    "SELECT * FROM Offers WHERE ID_product = ?",
    [ID_product]
  );

  return offer[0];
};
