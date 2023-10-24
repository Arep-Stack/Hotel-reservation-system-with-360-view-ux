const { Pool } = require('pg');

// Create a new pool of client connections
const pool = new Pool({
  user: 'postgres',
  host: 'localhost', // Change this to your PostgreSQL server host
  database: 'hotel_reservation',
  password: 'postgres',
  port: 5432, // Change this to your PostgreSQL server port
});

// Export a function that provides a database connection
module.exports = {
  query: (text, params, callback) => {
    return pool.query(text, params, callback);
  },
};