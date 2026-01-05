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

app.use(
  cors({
    origin: "*",
    optionsSuccessStatus: 200,
    methods: ["GET", "PUT", "POST", "DELETE"],
  })
);

app.use(morgenMiddlware);

// initialize database and models
require("./models");

// initialize the routes
require("./routes")(app);

const server = http.createServer(app);

server.listen(PORT, () => {
  Logger.info(`Server running on port ${PORT}`);
});
