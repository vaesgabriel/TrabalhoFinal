const request = require("supertest");
const express = require("express");
const tedsRoutes = require("../src/routes/tedsRoutes");

const app = express();
app.use(express.json());
app.use("/api/teds", tedsRoutes);

describe("API Endpoints", () => {
  it("should return OK for healthcheck", async () => {
    const res = await request(app).get("/api/teds/healthcheck");
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe("OK");
  });

  it("should reject login with invalid credentials", async () => {
    const res = await request(app)
      .post("/api/teds/login")
      .send({ email: "invalid@user.com", password: "wrongpassword" });
    expect(res.statusCode).toBe(401);
    expect(res.body.message).toBe("Credenciais inválidas.");
  });
});
