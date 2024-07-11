import { getPool } from "../../database/getPool.js";

export const selectProductListModel = async () => {
  const pool = getPool();

  // Obrengo la lista
  const result = await pool.query(`SELECT * FROM Products`);

  return result[0];
};
