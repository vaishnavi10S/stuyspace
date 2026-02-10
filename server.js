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

app.listen(3000, () => {
  console.log("🚀 Server running on http://localhost:3000");
});
