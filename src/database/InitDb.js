import { createConnection } from "mysql2/promise.js";
import { createSchema } from "./createSchema.js";
import {
  MYSQL_HOST,
  MYSQL_PASSWORD,
  MYSQL_PORT,
  MYSQL_USER,
} from "../../env.js";
import { deleteUploadsPathUtil } from "../Utils/deleteUploadsPathUtil.js";
import { createUploadsPathUtil } from "../Utils/createUploadsPathUtil.js";

const db = await createConnection({
  host: MYSQL_HOST,
  port: MYSQL_PORT,
  user: MYSQL_USER,
  password: MYSQL_PASSWORD,
});

// Crear la base de datos
await createSchema(db);
console.log("Base de datos creada");

// Borramos el directorio uploads y su contenido
await deleteUploadsPathUtil();
console.log("Directorios de uploads borrado");

// Creamos el directorio uploads
await createUploadsPathUtil();
console.log("Directorios uploads creado con exito");

await db.end();
process.exit(0);
