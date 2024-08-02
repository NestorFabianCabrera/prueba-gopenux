require('dotenv').config();
const { Pool } = require('pg');
const express = require("express")
const app = express()
const port = 3001

const cors = require("cors")
app.use(cors("*"))
app.use(express.json());

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

app.get("/questions", async (req, res) => {
    try {
      const { rows } = await pool.query("SELECT * FROM questions");
      res.json(rows);
    } catch (err) {
      console.error(err);
      res.status(500).send("Error al obtener las preguntas");
    }
  });  

app.post("/questions", async (req, res) => {
const { question, answer } = req.body;

if (!question || !answer) {
    return res.status(400).send("La pregunta y la respuesta son requeridas");
}

try {
    const { rows } = await pool.query(
    "INSERT INTO questions (question, answer) VALUES ($1, $2) RETURNING *",
    [question, answer]
    );
    res.status(201).json(rows[0]);
} catch (err) {
    console.error(err);
    res.status(500).send("Error al crear la pregunta");
}
});


app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})