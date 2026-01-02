const pool = require("../config/db");

module.exports = async (action, email) => {
    await pool.query(
        "INSERT INTO logs (action, email) VALUES ($1, $2)",
        [action, email]
    );
};