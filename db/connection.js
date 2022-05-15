const mysql = require("mysql2");

// Connect to database
const connection = mysql.createConnection({
  host: "localhost",
  // MySQL username,
  user: "root",
  // TODO: Add MySQL password
  password: "",
  database: "employees_db",
});

module.exports = connection;
