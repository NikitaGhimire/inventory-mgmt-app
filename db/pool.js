const { Pool } = require("pg");

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

//Testing connection logic
pool.connect((err) => {
  if (err) {
    console.error("Error connecting to the database", err);
  } else {
    console.log("Connected to the psql databse");
  }
});

//exporting for use
module.exports = pool;
