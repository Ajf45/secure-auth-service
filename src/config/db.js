const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
    connectionString: process.env.DB_URL
});

pool.query("SELECT 1")
    .then(() => console.log("Database connected successfully"))
    .catch(err => console.error("Database connection error:", err));
    
module.exports = pool;