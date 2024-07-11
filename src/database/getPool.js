import mysql from "mysql2/promise.js";

import {
  MYSQL_HOST,
  MYSQL_USER,
  MYSQL_PORT,
  MYSQL_PASSWORD,
  MYSQL_DATABASE,
} from "../../env.js";

let pool;

export const getPool = () => {
  try {
    if (!pool) {
      // Conexion a la base de datos
      pool = mysql.createPool({
        host: MYSQL_HOST,
        port: MYSQL_PORT,
        user: MYSQL_USER,
        password: MYSQL_PASSWORD,
        database: MYSQL_DATABASE,
        timezone: "Z",
      });
    }

    return pool;
  } catch (error) {
    console.log(error);
    error.message = "No se ha podido conectar con la base de datos";
    throw error;
  }
};
