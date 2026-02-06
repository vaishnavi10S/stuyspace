// Create a centralized DB connection file
const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",          // change if different
  password: "admin",          // your MySQL password
  database: "studyspace_db"
});

// connect once when app starts
db.connect((err) => {
  if (err) {
    console.error("❌ Database connection failed:", err);
    return;
  }
  console.log("✅ Connected to StudySpace Database");
});

module.exports = db;
