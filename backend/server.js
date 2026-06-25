const express = require("express");
const cors = require("cors");
const pool = require("./db");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend server is running");
});

// REGISTER API
app.post("/register", async (req, res) => {
  try {
    const { full_name, email, mobile } = req.body;

    if (!full_name || !email || !mobile) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (mobile.length !== 10) {
      return res.status(400).json({ message: "Mobile number must be 10 digits" });
    }

    const password = Math.floor(100000 + Math.random() * 900000).toString();

    const result = await pool.query(
      `INSERT INTO users (full_name, email, mobile, password)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [full_name, email, mobile, password]
    );

    res.json({
      message: "Registration successful",
      user: result.rows[0],
      userId: mobile,
      password: password,
    });
  } catch (error) {
    console.log("REGISTER ERROR:", error.message);

    res.status(500).json({
      message: "Registration failed",
      error: error.message,
    });
  }
});

// LOGIN API
app.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        message: "User ID and Password are required",
      });
    }

    const result = await pool.query(
      `SELECT * FROM users
       WHERE mobile = $1 AND password = $2`,
      [username, password]
    );

    if (result.rows.length > 0) {
      res.json({
        message: "Login successful",
        user: result.rows[0],
      });
    } else {
      res.status(401).json({
        message: "Invalid User ID or Password",
      });
    }
  } catch (error) {
    console.log("LOGIN ERROR:", error.message);

    res.status(500).json({
      message: "Login failed",
      error: error.message,
    });
  }
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});