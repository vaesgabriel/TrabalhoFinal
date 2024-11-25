const request = require("supertest");
const express = require("express");
const tedsRoutes = require("../src/routes/tedsRoutes");

const app = express();
app.use(express.json());
app.use("/api/teds", tedsRoutes);

describe("API Endpoints", () => {
  it("Deve retornar OK para verificação do HealthCheck", async () => {
    const res = await request(app).get("/api/teds/healthcheck");
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe("OK");
  });

  it("Deve rejeitar o login com credenciais inválidas", async () => {
    const res = await request(app)
      .post("/api/teds/login")
      .send({ email: "aluno2@teste.com", password: "teste" });
    expect(res.statusCode).toBe(401);
    expect(res.body.message).toBe("Credenciais inválidas.");
  });
});
