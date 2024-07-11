import "dotenv/config";

// Importar las variables de entorno de .env
export const {
  MYSQL_HOST,
  MYSQL_PORT,
  MYSQL_USER,
  MYSQL_PASSWORD,
  MYSQL_DATABASE,

  PORT,
  JTW_SECRET,
  UPLOADS_DIR,

  MAIL_TRAP_HOST,
  MAIL_TRAP_PORT,
  MAIL_TRAP_AUTH_USER,
  MAIL_TRAP_AUTH_PASS,

  API_HOST,
  FRONTEND_HOST,

  NODE_ENV,

  NAME_ADMIN,
  LAST_NAME,
  PASSWORD,
  ROLE,
  EMAIL,
  ACTIVE,
} = process.env;
