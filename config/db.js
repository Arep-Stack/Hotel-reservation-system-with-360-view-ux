const pgp = require('pg-promise')();
const dbConfig = {
  user: 'postgres',
  host: 'localhost',
  database: 'hotel_reservation',
  password: 'Css12345@',
  port: 5432,
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
    "LAST_MODIFIED" TIMESTAMPTZ DEFAULT NOW()
  );
  CREATE TABLE IF NOT EXISTS "RESERVATIONS" (
    "ID" SERIAL PRIMARY KEY,
    "USER_ID" INT NOT NULL,
    "AMENITY_ID" INT NOT NULL,
    "PAYMENT_ID" INT NOT NULL,
    "DESCRIPTION" VARCHAR(255)
  );
  CREATE TABLE IF NOT EXISTS "PAYMENTS" (
    "ID" SERIAL PRIMARY KEY,
    "USER_ID" INT NOT NULL,
    "TYPE" VARCHAR(255) NOT NULL,
    "STATUS" VARCHAR(255) NOT NULL,
    "AMOUNT" DOUBLE PRECISION NOT NULL
  );
  CREATE TABLE IF NOT EXISTS "AMENITIES" (
    "ID" SERIAL PRIMARY KEY,
    "NAME" VARCHAR(255) NOT NULL,
    "TYPE" VARCHAR(255) NOT NULL,
    "QUANTITY" INT NOT NULL,
    "PRICE" DOUBLE PRECISION NOT NULL,
    "DESCRIPTION" VARCHAR(255)
  );
`;

// Create the table
db.none(createTableQuery)
  .then(() => {
    console.log('Tables created successfully');
  })
  .catch((error) => {
    console.error('Error creating tables:', error);
  });

// Export a function that provides a database connection
// module.exports = {
//   query: (text, params, callback) => {
//     return db.query(text, params, callback);
//   },
// };
module.exports = db;