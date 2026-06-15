const express = require("express");
const cors = require("cors");
const pool = require("./db");

const app = express();
app.use(express.json());
app.use(cors());
app.get("/", async (req, res) => {
 try {
  await pool.query("SELECT NOW()");
  res.send("Database Connected Sucessfully");
 } catch (error) {
   res.send(error.message);
 }
});
app.post("/register", async (req, res) => {
  try {
    const { full_name, email, mobile } = req.body;

    const result = await pool.query(
      "INSERT INTO users (full_name, email, mobile) VALUES ($1, $2, $3) RETURNING *",
      [full_name, email, mobile]
    );

    res.json({
      message: "User registered successfully",
      user: result.rows[0],
    });
  } catch (error) {
    res.status(500).json({
      message: "Registration failed",
      error: error.message,
    });
  }
});
app.use(express.json());

app.post("/register", async (req, res) => {
  const { full_name, email, mobile } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO users(full_name,email,mobile)
       VALUES($1,$2,$3)
       RETURNING *`,
      [full_name, email, mobile]
    );

    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).send(error.message);
  }
});
app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const result = await pool.query(
      "SELECT * FROM users WHERE id = $1 AND mobile = $2",
      [username, password]
    );

    if (result.rows.length > 0) {
      res.json({
        message: "Login successful",
        user: result.rows[0],
      });
    } else {
      res.status(401).json({
        message: "Invalid username or password",
      });
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
});
app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const result = await pool.query(
      "SELECT * FROM users WHERE id = $1 AND mobile = $2",
      [username, password]
    );

    if (result.rows.length > 0) {
      res.json({
        message: "Login successful",
        user: result.rows[0],
      });
    } else {
      res.status(401).json({
        message: "Invalid username or password",
      });
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
});
app.listen(5000, () => {
 console.log("Server running on port 5000");
});