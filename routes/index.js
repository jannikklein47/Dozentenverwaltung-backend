const express = require("express");
const router = express.Router();
const path = require("path");
const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUI = require("swagger-ui-express");
const Logger = require("../utils/logger");
const APIError = require("../utils/error");
const v1_0 = require("./v1.0/v1Router");

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Express API für das Dozentenverwaltungssystem",
    version: "1.0.0",
    description: "Express API",
    // contact
  },
  components: {},
  servers: [
    {
      url: `http://localhost:${process.env.PORT || 3000}/api/v1.0`,
      description: "Development server",
    },
  ],
};
const options = {
  swaggerDefinition,
  apis: ["./routes/v1.0/**/*.js"],
};
const specs = swaggerJSDoc(options);

const error404 = (req, res, next) => {
  next(APIError.errorNotFound());
};

const errorHandler = (error, req, res, next) => {
  //console.error(error);
  Logger.error(
    `${error.message}: responding with ${
      error.statusCode || 500
    } / success => ${error.success || false}`
  );
  if (process.env.NODE_ENV !== "development") {
    delete error.stack;
  }
  res.status(error.statusCode || 500).send(error);
};

module.exports = (app) => {
  router.use("/api/v1.0", v1_0);
  router.use("/api/v1.0/apidocs", swaggerUI.serve, swaggerUI.setup(specs));
  router.use(error404);
  router.use(errorHandler);
  app.use(router);
};
