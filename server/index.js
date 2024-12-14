const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");
require("dotenv").config();

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(express.json()); // Парсим JSON в запросах

// Подключение к базе данных PostgreSQL
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

// Получение всех карточек
app.get("/api/cards", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM cards");
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Добавление карточки
app.post("/api/cards", async (req, res) => {
  try {
    const { title, description, image_url, user_id } = req.body;
    const result = await pool.query(
      "INSERT INTO cards (title, description, image_url, user_id) VALUES ($1, $2, $3, $4) RETURNING *",
      [title, description, image_url, user_id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Удаление карточки
app.delete("/api/cards/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query("DELETE FROM cards WHERE id = $1", [id]);
    res.json({ message: "Card deleted successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}...`);
});
                                                                                        