// Load DB connection in your main server file
// const express = require("express");
// const app = express();
// const db = require("./config/db"); // 🔑 DB CONNECTED HERE

// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());

// // routes
// app.use("/admin", require("./routes/adminRoutes"));
// app.use("/student", require("./routes/studentRoutes"));

// app.listen(3000, () => {
//   console.log("🚀 StudySpace running on port 3000");
// });



const express = require("express");
const app = express();
const db = require("./database");

app.use(express.json());
app.use(express.static(__dirname)); // serve html files

// Root route - redirect to first page
app.get("/", (req, res) => {
  res.redirect("/first.html");
});

// 🔹 API for student signup
app.post("/api/auth/signup", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password required" });
  }

  // Check if student already exists
  const checkSql = "SELECT * FROM students WHERE email = ?";
  db.query(checkSql, [email], (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Database error" });
    }

    if (results.length > 0) {
      return res.status(400).json({ error: "Email already registered" });
    }

    // Insert new student
    const insertSql = "INSERT INTO students (email, password) VALUES (?, ?)";
    db.query(insertSql, [email, password], (err, result) => {
      if (err) {
        return res.status(500).json({ error: "Signup failed" });
      }
      res.json({ success: true, message: "Student registered successfully", studentId: result.insertId });
    });
  });
});

// 🔹 API for student login
app.post("/api/auth/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password required" });
  }

  const sql = "SELECT student_id, email FROM students WHERE email = ? AND password = ?";
  db.query(sql, [email, password], (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Database error" });
    }

    if (results.length === 0) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const student = results[0];
    res.json({
      success: true,
      message: "Login successful",
      studentId: student.student_id,
      email: student.email,
      userRole: "learner"
    });
  });
});

// 🔹 API for admin login
app.post("/api/auth/admin-login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password required" });
  }

  const sql = "SELECT admin_id, email FROM admin WHERE email = ? AND password = ?";
  db.query(sql, [email, password], (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Database error" });
    }

    if (results.length === 0) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const admin = results[0];
    res.json({
      success: true,
      message: "Admin login successful",
      adminId: admin.admin_id,
      email: admin.email,
      userRole: "admin"
    });
  });
});

// 🔹 API to get student uploads
app.get("/api/student/uploads", (req, res) => {
  const sql = "SELECT * FROM student_uploads";

  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Database error" });
    }
    res.json(results);
  });
});

// 🔹 API to get admin resources
app.get("/api/resources", (req, res) => {
  const sql = "SELECT * FROM resource";

  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Database error" });
    }
    res.json(results);
  });
});

// 🔹 API to save canvas drawing
app.post("/api/canvas/save", (req, res) => {
  const { spaceName, studentEmail, imageData } = req.body;

  if (!spaceName || !studentEmail || !imageData) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const sql = "INSERT INTO canvas_drawings (space_name, student_email, image_data) VALUES (?, ?, ?)";
  
  db.query(sql, [spaceName, studentEmail, imageData], (err, result) => {
    if (err) {
      return res.status(500).json({ error: "Failed to save canvas" });
    }
    res.json({ success: true, drawingId: result.insertId });
  });
});

// 🔹 API to load canvas drawing
app.get("/api/canvas/load/:spaceName/:studentEmail", (req, res) => {
  const { spaceName, studentEmail } = req.params;

  const sql = "SELECT image_data FROM canvas_drawings WHERE space_name = ? AND student_email = ? ORDER BY updated_at DESC LIMIT 1";
  
  db.query(sql, [spaceName, studentEmail], (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Failed to load canvas" });
    }
    
    if (results.length === 0) {
      return res.json({ imageData: null });
    }
    
    res.json({ imageData: results[0].image_data });
  });
});

app.listen(8001, () => {
  console.log("🚀 Server running on http://localhost:8001");
});
