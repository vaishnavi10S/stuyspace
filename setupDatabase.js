// Script to initialize MySQL database
const mysql = require('mysql2');

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "admin"  // Update this with your actual MySQL password if different
});

db.connect((err) => {
  if (err) {
    console.error("❌ Connection failed:", err.message);
    return;
  }
  console.log("✅ Connected to MySQL");

  // Create database
  db.query("CREATE DATABASE IF NOT EXISTS studyspace_db", (err) => {
    if (err) {
      console.error("❌ Failed to create database:", err.message);
      return;
    }
    console.log("✅ Database created/exists");

    // Switch to database
    db.changeUser({ database: "studyspace_db" }, (err) => {
      if (err) {
        console.error("❌ Failed to select database:", err.message);
        return;
      }
      console.log("✅ Database selected");

      // Define all queries (single line for each)
      const queries = [
        "CREATE TABLE IF NOT EXISTS admin (admin_id INT AUTO_INCREMENT PRIMARY KEY, email VARCHAR(100) UNIQUE NOT NULL, password VARCHAR(255) NOT NULL)",
        
        "CREATE TABLE IF NOT EXISTS students (student_id INT AUTO_INCREMENT PRIMARY KEY, email VARCHAR(100) UNIQUE NOT NULL, password VARCHAR(255) NOT NULL)",
        
        "CREATE TABLE IF NOT EXISTS resource (resource_id INT AUTO_INCREMENT PRIMARY KEY, title VARCHAR(200) NOT NULL, subject VARCHAR(100) NOT NULL, file_path VARCHAR(255) NOT NULL, uploaded_by_admin INT, FOREIGN KEY (uploaded_by_admin) REFERENCES admin(admin_id) ON DELETE SET NULL)",
        
        "CREATE TABLE IF NOT EXISTS student_uploads (upload_id INT AUTO_INCREMENT PRIMARY KEY, student_id INT NOT NULL, title VARCHAR(200) NOT NULL, subject VARCHAR(100) NOT NULL, file_path VARCHAR(255) NOT NULL, FOREIGN KEY (student_id) REFERENCES students(student_id) ON DELETE CASCADE)",
        
        "CREATE TABLE IF NOT EXISTS canvas_drawings (drawing_id INT AUTO_INCREMENT PRIMARY KEY, space_name VARCHAR(200) NOT NULL, student_email VARCHAR(100) NOT NULL, image_data LONGBLOB NOT NULL, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP)",
        
        "INSERT IGNORE INTO admin (email, password) VALUES ('admin@studyspace.com', 'admin123')",
        "INSERT IGNORE INTO students (email, password) VALUES ('student1@test.com', 'student123')"
      ];

      // Execute queries sequentially
      let index = 0;

      function executeNextQuery() {
        if (index >= queries.length) {
          console.log("\n✅ All tables created and test data inserted!\n");
          console.log("Test credentials:");
          console.log("  Admin: admin@studyspace.com / admin123");
          console.log("  Student: student1@test.com / student123\n");
          db.end();
          return;
        }

        db.query(queries[index], (err) => {
          if (err && err.code !== 'ER_TABLE_EXISTS_ERROR') {
            console.error(`❌ Query failed (${index}):`, err.message);
            db.end();
            return;
          }
          index++;
          executeNextQuery();
        });
      }

      executeNextQuery();
    });
  });
});
