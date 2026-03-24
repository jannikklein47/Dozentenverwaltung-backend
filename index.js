const dotenv = require("dotenv");
dotenv.config();
const path = require("path");
const PORT = process.env.PORT || 3000;
const express = require("express");
const app = express();
const cors = require("cors");
const http = require("http");
const morgenMiddlware = require("./utils/morganMiddleware");
const Logger = require("./utils/logger");
const { globalLimiter } = require("./routes/v1.0/ratelimiter");

if (!process.env.JWT_SECRET) {
  console.error("JWT_SECRET is not defined in environment variables.");
  process.exit(1);
}

app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "http://localhost:9000",
    allowedHeaders: ["Content-Type", "authorization"],
    optionsSuccessStatus: 200,
    methods: ["GET", "PUT", "POST", "DELETE"],
  }),
);

app.use(morgenMiddlware);

// initialize database and models
require("./models");

app.use(express.json({ limit: "5mb" }));

app.use(globalLimiter);

// initialize the routes
require("./routes")(app);

const server = http.createServer(app);

server.listen(PORT, () => {
  Logger.info(`Server running on port ${PORT}`);
});
