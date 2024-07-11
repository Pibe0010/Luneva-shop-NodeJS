import { createConnection } from "mysql2/promise.js";
import { createSchema } from "./createSchema.js";
import {
  MYSQL_HOST,
  MYSQL_PASSWORD,
  MYSQL_PORT,
  MYSQL_USER,
} from "../../env.js";

const db = await createConnection({
  host: MYSQL_HOST,
  port: MYSQL_PORT,
  user: MYSQL_USER,
  password: MYSQL_PASSWORD,
});

// Crear la base de datos
await createSchema(db);
console.log("Base de datos creada");

await db.end();
process.exit(0);
