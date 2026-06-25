const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const dotenv = require("dotenv");
const client = require("prom-client");
const sequelize = require("./config/database");
const complaintRoutes = require("./routes/complaintRoutes");
const Complaint = require("./models/Complaint");
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(helmet());
app.use(cors());
app.use(express.json());

const register = new client.Registry();
client.collectDefaultMetrics({
  register,
  prefix: "desc_",
});

app.get("/", (req, res) => {
  res.json({
    message: "DESC Citizen Portal Backend Running",
    status: "OK",
  });
});
app.use("/api/complaints", complaintRoutes);
app.get("/api/health", (req, res) => {
  res.json({
    status: "healthy",
    service: "backend",
    uptime: process.uptime(),
  });
});

app.get("/api/metrics", async (req, res) => {
  res.set("Content-Type", register.contentType);
  res.end(await register.metrics());
});
sequelize
  .sync()
  .then(() => {
    console.log("PostgreSQL connected successfully");
    app.listen(PORT, () => {
      console.log(`Backend running on port ${PORT}`);
    });
  })
  .catch((err) => console.error("Database connection failed:", err.message));
