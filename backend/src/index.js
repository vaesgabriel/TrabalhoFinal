const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get("/api/teds/healthcheck", (req, res) => {
  res.status(200).json({ status: "OK" });
});

app.use("/api/teds", require("./routes/tedsRoutes"));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
