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

app.listen(3000, () => {
  console.log("🚀 Server running on http://localhost:3000");
});
