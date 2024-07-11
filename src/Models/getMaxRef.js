import { getPool } from "../database/getPool.js";

export const getMaxReference5Digits = async (tableName, refField) => {
  const pool = await getPool();
  const query = `SELECT ${refField} FROM ${tableName} ORDER BY ${refField} DESC LIMIT 1`;
  const [result] = await pool.query(query);
  return result.length > 0 ? result[0][refField] : null;
};
