import {
  MYSQL_DATABASE,
  NAME_ADMIN,
  LAST_NAME,
  PASSWORD,
  ROLE,
  EMAIL,
  ACTIVE,
} from "../../env.js";
import bcrypt from "bcrypt";

export const createSchema = async (db) => {
  console.log("Borrado base de base de datos (si existe)");
  await db.query(`DROP DATABASE IF EXISTS ${MYSQL_DATABASE}`);

  console.log(`Creando base de datos ${MYSQL_DATABASE}`);

  await db.query(`CREATE DATABASE IF NOT EXISTS ${MYSQL_DATABASE}`);
  await db.query(`USE ${MYSQL_DATABASE}`);

  // Usuario
  await db.query(`
    CREATE TABLE IF NOT EXISTS Users (
        ID_user CHAR(36) PRIMARY KEY NOT NULL,
        user_name VARCHAR(100) NOT NULL,
        last_name VARCHAR(100),
        email VARCHAR(100) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        role ENUM("customer", "admin") DEFAULT "customer",
        active BOOLEAN DEFAULT false,
        registrationCode CHAR(36),
        avatar CHAR(40),
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        updatedAt DATETIME DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP
    );
    `);

  // Cliente
  await db.query(`
    CREATE TABLE IF NOT EXISTS Customers (
        ID_customer CHAR(36) PRIMARY KEY NOT NULL,
        ID_user CHAR(36) NOT NULL,
        phone VARCHAR(20),
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        updatedAt DATETIME DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (ID_user) REFERENCES Users(ID_user)
    );
    `);

  // Productos
  await db.query(`
    CREATE TABLE IF NOT EXISTS Products (
        ID_product CHAR(36) PRIMARY KEY NOT NULL,
        ref_PR CHAR(10) UNIQUE NOT NULL,
        name VARCHAR(100) NOT NULL,
        description TEXT,
        price DECIMAL(10, 2) NOT NULL,
        Stock INT NOT NULL,
        image_one VARCHAR(255),
        image_two VARCHAR(255),
        image_tree VARCHAR(255),
        category VARCHAR(100),
        active ENUM("true", "false") DEFAULT "true",
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        updatedAt DATETIME DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP
    );
    `);

  // Carrito
  await db.query(`
    CREATE TABLE IF NOT EXISTS Trolleys (
        ID_trolley CHAR(36) PRIMARY KEY NOT NULL,
        ID_customer CHAR(36) NOT NULL,
        ID_product CHAR(36) NOT NULL,
        products_amount INT NOT NULL,
        process ENUM("pending", "sent", "cancelled") DEFAULT "pending",
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        updatedAt DATETIME DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (ID_customer) REFERENCES Customers(ID_customer),
        FOREIGN KEY (ID_product) REFERENCES Products(ID_product)
    );
    `);

  // Compra
  await db.query(`
    CREATE TABLE IF NOT EXISTS Orders (
        ID_order CHAR(36) PRIMARY KEY NOT NULL,
        ID_customer CHAR(36) NOT NULL,
        ID_product CHAR(36) NOT NULL,
        amount INT NOT NULL,
        date_order DATETIME DEFAULT CURRENT_TIMESTAMP,
        status ENUM("earring", "sent", "delivered", "cancelled") DEFAULT "earring",
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        updatedAt DATETIME DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (ID_customer) REFERENCES Customers(ID_customer),
        FOREIGN KEY (ID_product) REFERENCES Products(ID_product)
    );
    `);
  // Detalles de la compra
  await db.query(`
    CREATE TABLE  IF NOT EXISTS Order_Details (
        ID_Detail CHAR(36) PRIMARY KEY NOT NULL,
        ID_order CHAR(36) NOT NULL,
        ID_product CHAR(36) NOT NULL,
        amount INT NOT NULL,
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        updatedAt DATETIME DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (ID_order) REFERENCES Orders(ID_order)
        
    );
    `);
  // Pagos
  await db.query(`
    CREATE TABLE  IF NOT EXISTS Payments (
        ID_payment CHAR(36) PRIMARY KEY NOT NULL,
        ID_order CHAR(36) NOT NULL,
        payment_method ENUM("card", "transfer", "PayPal"),
        payment_date DATETIME DEFAULT CURRENT_TIMESTAMP,
        total_amount DECIMAL(10, 2) NOT NULL,
        iva_payments DECIMAL(10, 2) NOT NULL,
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        updatedAt DATETIME DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (ID_order) REFERENCES Orders(ID_order)
    );
    `);

  // Envios
  await db.query(`
    CREATE TABLE IF NOT EXISTS shipments (
        ID_shipment CHAR(36) PRIMARY KEY NOT NULL,
        ID_order CHAR(36) NOT NULL,
        address VARCHAR(255) NOT NULL,
        street_number VARCHAR(40) NOT NULL,
        floor VARCHAR(40) NOT NULL,
        ladder VARCHAR(40) NOT NULL,
        city VARCHAR(100) NOT NULL,
        postal_code VARCHAR(40) NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        phone VARCHAR(20) NOT NULL,
        shipping_date DATETIME DEFAULT CURRENT_TIMESTAMP,
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        updatedAt DATETIME DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (ID_order) REFERENCES Orders(ID_order)
    );
    `);

  // direccion de envio
  await db.query(`
    CREATE TABLE IF NOT EXISTS Shipping_Addresses (
        ID_address CHAR(36) PRIMARY KEY NOT NULL,
        ID_customer CHAR(36) NOT NULL,
        ID_shipment CHAR(36)  NOT NULL,
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        updatedAt DATETIME DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (ID_customer) REFERENCES Customers(ID_customer),
        FOREIGN KEY (ID_shipment) REFERENCES Shipments(ID_shipment)

    );
    `);

  // Ticket de compra
  await db.query(`
    CREATE TABLE IF NOT EXISTS Ticket_Purchases (
        ID_ticket CHAR(36) PRIMARY KEY NOT NULL,
        ID_order CHAR(36) NOT NULL,
        ticket_date DATETIME DEFAULT CURRENT_TIMESTAMP,
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        updatedAt DATETIME DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (ID_order) REFERENCES Orders(ID_order)
    );
    `);

  // Ofertas
  await db.query(`
    CREATE TABLE IF NOT EXISTS Offers (
        ID_offer CHAR(36) PRIMARY KEY NOT NULL,
        ID_product CHAR(36) NOT NULL,
        discount_rate DECIMAL(5, 2),
        start_date DATE,
        ending_date DATE,
        active ENUM("true", "false") DEFAULT "true",
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        updatedAt DATETIME DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (ID_product) REFERENCES Products(ID_product)
    );
    `);

  // stock de productos
  await db.query(`
    CREATE TABLE IF NOT EXISTS Stock_Products (
        ID_stock CHAR(36) PRIMARY KEY NOT NULL,
        ID_product CHAR(36) NOT NULL,
        quantity_available INT NOT NULL,
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        updatedAt DATETIME DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (ID_product) REFERENCES Products(ID_product)
    );
    `);
  console.log("Base de datos creada con exito");

  // Creamos el admin

  const user_ID = crypto.randomUUID();
  const password = PASSWORD;
  const hashed_pass = await bcrypt.hash(password, 12);
  const registrationCode = crypto.randomUUID();

  await db.query(
    `INSERT INTO Users (ID_user, user_name, last_name, email, password, registrationCode, role, active) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      user_ID,
      NAME_ADMIN,
      LAST_NAME,
      EMAIL,
      hashed_pass,
      registrationCode,
      ROLE,
      ACTIVE,
    ]
  );
  console.log("Admin creado con exito");
};
