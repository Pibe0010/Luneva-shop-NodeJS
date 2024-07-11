import { getPool } from "../../database/getPool.js";

export const selectProductSearchModel = async (searchTerm) => {
  const pool = getPool();

  const [rows] = await pool.query(
    `SELECT * FROM Products WHERE name LIKE? OR ref_PR LIKE?`,
    [`%${searchTerm}%`, `%${searchTerm}%`]
  );
  console.log(rows, "Model");
  return rows;
};
