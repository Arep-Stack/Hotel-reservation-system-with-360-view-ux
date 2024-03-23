const pgp = require('pg-promise')();
require('dotenv').config();

const dbConfig = {
  connectionString: process.env.DATABASE_CONNECTION,
  
  // user: 'postgres',
  // host: 'localhost',
  // database: 'hotel_reservation',
  // password: 'postgres',
  // port: 5432,
   ssl: {
     rejectUnauthorized: false
   }
};
const db = pgp(dbConfig);
// Define a table schema
const createTableQuery = `
  CREATE TABLE IF NOT EXISTS "USERS" (
    "ID" SERIAL PRIMARY KEY,
    "FIRSTNAME" VARCHAR(255) NOT NULL,
    "LASTNAME" VARCHAR(255) NOT NULL,
    "EMAIL" VARCHAR(255) UNIQUE NOT NULL,
    "PHONE_NUMBER" VARCHAR(255) NOT NULL,
    "ADDRESS" VARCHAR(255) NOT NULL,
    "PASSWORD" VARCHAR(255) NOT NULL,
    "IS_ADMIN" bool NOT NULL DEFAULT FALSE,
    "IS_ACTIVE" bool NOT NULL DEFAULT TRUE,
    "DATE_ADDED" TIMESTAMPTZ DEFAULT NOW(),
    "LAST_MODIFIED" TIMESTAMPTZ DEFAULT NOW(),
    "QR_IMAGE" VARCHAR(255) DEFAULT ''
  );
  CREATE TABLE IF NOT EXISTS "RESERVATIONS" (
    "ID" SERIAL PRIMARY KEY,
    "USER_ID" INT NOT NULL,
    "SERVICE_ID" INT NOT NULL,
    "STATUS" VARCHAR(255) NOT NULL,
    "DESCRIPTION" VARCHAR(255),
    "START_DATE" TIMESTAMPTZ NOT NULL,
    "END_DATE" TIMESTAMPTZ NOT NULL,
    "AMOUNT" DOUBLE PRECISION NOT NULL,
    "BALANCE" DOUBLE PRECISION DEFAULT 0,
    "PAYMENT_HISTORY" JSONB[],
    "IS_DOWNPAYMENT_PAID" bool,
    "ADDONS" JSONB[],
    "PAX" INT
  );
  CREATE TABLE IF NOT EXISTS "PAYMENTS" (
    "ID" SERIAL PRIMARY KEY,
    "PAYMENT_CODE" VARCHAR(255) NOT NULL,
    "USER_ID" INT NOT NULL,
    "TYPE" VARCHAR(255) NOT NULL,
    "CONTENT" JSON NOT NULL
  );
  CREATE TABLE IF NOT EXISTS "SERVICES" (
    "ID" SERIAL PRIMARY KEY,
    "NAME" VARCHAR(255) NOT NULL,
    "TYPE" VARCHAR(255) NOT NULL,
    "QUANTITY" INT NOT NULL,
    "PRICE" DOUBLE PRECISION NOT NULL,
    "IMAGE" VARCHAR(255),
    "PERSONS" INT,
    "AMENITIES" VARCHAR(255)[],
    "MAIN360" VARCHAR(255),
    "OTHER360" VARCHAR(255),
    "IS_DELETED" bool NOT NULL DEFAULT FALSE,
    "PRICE_EXCEED" INT,
    "ADDONS" JSONB[]
  );
  CREATE TABLE IF NOT EXISTS "IMAGES" (
    "ID" VARCHAR(255) UNIQUE NOT NULL,
    "FILE_NAME" VARCHAR(255) NOT NULL,
    "PATH" VARCHAR(255) NOT NULL
  );
`;
// const alterTableQuery = `
//   ALTER TABLE "USERS"
//   ADD COLUMN "QR_IMAGE" VARCHAR(255)
// `;
// Create the table
db.none(createTableQuery)
  .then(() => {
    console.log('Tables created successfully');
  })
  .catch((error) => {
    console.error('Error creating tables:', error);
  });
module.exports = db;
