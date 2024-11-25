const express = require("express");
const router = express.Router();
const pool = require("../database");
const jwt = require("jsonwebtoken");

// Middleware para autenticação usando JWT.
const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(" ")[1];

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }
      req.user = user;
      next();
    });
  } else {
    res.sendStatus(401);
  }
};

// Rota para o healthcheck.
router.get("/healthcheck", (req, res) => {
  res.status(200).json({ status: "OK", timestamp: new Date() });
});

// Rota de login que valida as credenciais e retorna um token JWT.
router.post("/login", (req, res) => {
  const { email, password } = req.body;
  if (email === "aluno@teste.com" && password === "teste") {
    try {
      const token = jwt.sign({ email }, process.env.JWT_SECRET, {
        expiresIn: "1h", 
      });
      res.status(200).json({ token });
    } catch (error) {
      console.error("Erro ao gerar o token:", error);
      res.status(500).json({ message: "Erro interno no servidor." });
    }
  } else {
    res.status(401).json({ message: "Credenciais inválidas." });
  }
});

// Rota para listar entregas com paginação.
router.get("/deliveries", async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const offset = (page - 1) * limit;

  try {
    const result = await pool.query(
      "SELECT * FROM deliveries ORDER BY id LIMIT $1 OFFSET $2",
      [limit, offset]
    );
    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Erro ao listar entregas:", error);
    res.status(500).json({ error: "Erro ao buscar entregas." });
  }
});

// Rota para criar uma nova entrega.
router.post("/deliveries", async (req, res) => {
  const { customer_name, address, order_details, status } = req.body; 
  console.log("Dados recebidos para criação de entrega:", req.body);

  try {
    const result = await pool.query(
      "INSERT INTO deliveries (customer_name, address, order_details, status) VALUES ($1, $2, $3, $4) RETURNING *",
      [customer_name, address, order_details, status]
    );
    console.log("Entrega criada com sucesso:", result.rows[0]);
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Erro ao criar entrega:", error);
    res.status(500).json({ error: "Erro ao criar entrega." });
  }
});

// Rota para atualizar uma entrega existente.
router.put("/deliveries/:id", async (req, res) => {
  const { id } = req.params;
  const { customer_name, address, order_details, status } = req.body;

  try {
    const result = await pool.query(
      "UPDATE deliveries SET customer_name=$1, address=$2, order_details=$3, status=$4 WHERE id=$5 RETURNING *",
      [customer_name, address, order_details, status, id]
    );
    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error("Erro ao atualizar entrega:", error);
    res.status(500).json({ error: "Erro ao atualizar entrega." });
  }
});

// Rota para excluir uma entrega existente.
router.delete("/deliveries/:id", async (req, res) => {
  const { id } = req.params;

  try {
    await pool.query("DELETE FROM deliveries WHERE id=$1", [id]);
    res.status(204).send();
  } catch (error) {
    console.error("Erro ao excluir entrega:", error);
    res.status(500).json({ error: "Erro ao excluir entrega." });
  }
});

module.exports = router;
